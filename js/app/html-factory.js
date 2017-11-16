define(['jquery', 'translations-manager', 'local-storage-manager', 'utils', 'bootstrap'], function ($, translations, storageManager, utils) {  
    'use strict';

    // refresh the translation of an element
    // $element - jquery element to translate
    // culture - culture to use in translations
    function refreshTranslation($element, culture) {
        $element.text((translations.translate($element.attr('translation-id'), culture)));
    }

    // refresh all the translations 
    // culture - culture to use in translations
    function refreshAllTranslations(culture) {
        $.each($('[translation-id]'), function () { 
            refreshTranslation($(this), culture);
        });
    }

    // refresh numbers/stars result key
    // type - numbers, stars
    // resultArr - sorted array with results
    function refreshResult(type, resultArr) {
        var str = ($('#' + type + 'ResultLabel')[0]).outerHTML + ' ';
        $.each(resultArr, function (indexInArray, valueOfElement) { 
            str += '<span class="badge">' + valueOfElement + '</span>';
        });
        $('#' + type + 'Result').html(str);
    }

    // return html for a button
    // options
    // id - button id
    // text - button text or image alternate text (optional)
    // src - image uri (optional)
    // color - default, primary, success, info, warning, danger (optional)
    // translationId - id of translation (optional)
    function buttonHtml(options) {
        var innerBtn = '';
        if (!('text' in options)) {
            $.extend(options, { text: ''});   
        }
        if (!('color' in options)) {
            $.extend(options, { color: 'default'});   
        }
        if ('src' in options) {
            innerBtn = '<img src="' + options.src + '" class="img-responsive" alt="' + options.text + '">';
        } else {
            innerBtn = options.text;
        }
        if ('translationId' in options) {
            options.translationId = 'translation-id="' + options.translationId + '"';
        } else {
            options.translationId = '';
        }
        return '<button type="button" id="' + options.id + '" class="btn btn-' + options.color + '" ' + options.translationId + '>' + innerBtn + '</button>';
    }

    // return html for grid line numbers/stars
    // min - min number (inclusive)
    // max - max number (inclusive)
    // type - number, star
    function btnGroupHtml(min, max, type) {
        var str = '';
        str += '<div class="row">';
        str += '    <div class="btn-group btn-group-sm margin-left-10" role="group" aria-label="...">';
                        for (var i = min; i <= max; i++) {
                            var name = type + i;
                            str += buttonHtml({id: (type + i), text: utils.addZero(i.toString())});
                        }
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for header (logo, title and subtitle)
    function headerHtml() {
        var str = '';
        str += '<div id=""header class="row">';
        str += '    <div class="col-sm-4">';
        str += '        <img src="img/eurom.png" class="img-responsive" alt="Euromillions">';
        str += '    </div>';
        str += '    <div class="col-sm-8">';
        str += '        <h3 id="title" translation-id="title"></h3>';
        str += '        <h6 id="titleDesc" translation-id="titleDesc"></h6>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for flag buttons group
    function flagsButtonGroupHtml() {
        var str = '';
        str += '<div id="flagsButtonGroup" class="row">';
        str += '    <div class="btn-group btn-group-xs pull-right margin-right-10" role="group" aria-label="...">';
        str +=          buttonHtml({id: 'portugueseFlagBtn', text: 'Portuguese flag', src: './img/portuguese-flag.png'});
        str +=          buttonHtml({id: 'usaFlagBtn', text: 'Usa flag', src: './img/usa-flag.png'});
        str +=          buttonHtml({id: 'frenchFlagBtn', text: 'French flag', src: './img/french-flag.png'});
        str +=          buttonHtml({id: 'germanFlagBtn', text: 'German flag', src: './img/german-flag.png'});
        str +=          buttonHtml({id: 'spanishFlagBtn', text: 'Spanish flag', src: './img/spanish-flag.png'});
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for otpions buttons group
    function optionsButtonGroupHtml() {
        var str = '';
        str += '<div class="row margin-left-10">';
        str += '    <div class="btn-group btn-group-sm pull-left" role="group" aria-label="...">';
        str +=          buttonHtml({id: 'randomKeyBtn', translationId: 'randomKey', color: 'warning'});
        str +=          buttonHtml({id: 'cleanBtn', translationId: 'clean'});
        str +=          buttonHtml({id: 'helpBtn', translationId: 'help'});
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for number/star buttons bocks
    // type - number, star
    function numbersGridHtml(type) {
        var str = '';
        if (type === 'number') {
            str += btnGroupHtml(1, 6, type);
            str += btnGroupHtml(7, 12, type);
            str += btnGroupHtml(13, 18, type);
            str += btnGroupHtml(19, 24, type);
            str += btnGroupHtml(25, 30, type);
            str += btnGroupHtml(31, 36, type);
            str += btnGroupHtml(37, 42, type);
            str += btnGroupHtml(43, 48, type);
            str += btnGroupHtml(49, 50, type);
        } else {
            str += btnGroupHtml(1, 6, type);
            str += btnGroupHtml(7, 12, type);
        } 
        return str;
    }

    // return html for numbers/stars grid
    // resultDivId - element id for result key div
    // buttonDivId - element id for number buttons div
    // gridButtonsHtml - html for grid buttons
    // type - numbers, stars
    function gridHtml(resultDivId, buttonDivId, gridButtonsHtml, type) {
        var str = '';
        str += '<div class="col-sm-4">';
        str += '    <div class="row padding-left-20">';
        str += '        <div id="' + resultDivId + '" class="margin-10">';
        str += '            <span id="' + type + 'ResultLabel' + '" translation-id="' + type + '"></span>';
        str += '        </div>';
        str += '    </div>';
        str += '    <div class="row padding-left-20">';
        str += '        <div id="' + buttonDivId + '" class="margin-10">';
        str +=              gridButtonsHtml;
        str += '        </div>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html to display no result message
    // culture - culture to use in translations
    function noPremiumKeyResultHtml(culture) {
        var str = '';
        str += '<div class="row">';
        str += '    <div class="col-sm-12">';
        str += '        <h5 id="noPremiumKey" translation-id="toCalculatePremiumKeyThereMustOneRandom" class="text-warning">' + translations.translate('toCalculatePremiumKeyThereMustOneRandom', culture)  + '</h5>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // create html to display premium key
    // array - array with numbers/stars to display
    function premiumResultHtml(array) {
        var str = '';
        str += '<div class="row">';
        str += '    <div class="col-sm-12 text-center">';
                        $.each(array, function (indexInArray, valueOfElement) { 
                            str += '<span class="badge">' + utils.addZero(valueOfElement.toString()) + '</span>';
                        });
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // refresh premium key panel
    // numbersPremium - array with numbers premium key
    // starsPremium - array with stars premium key
    // culture - culture to use in translations
    function refreshPremiumKey(numbersPremium, starsPremium, culture) {
        var str = '';
        if (numbersPremium.length > 0) {
            str += premiumResultHtml(numbersPremium);
            str += premiumResultHtml(starsPremium);
        } else {
            str += noPremiumKeyResultHtml(culture);
        }
        $('#panelBodyPremiumKey').html(str);
    }

    // return html for number of times random keys was generated
    // totalRandoms - number of times random keys was generated
    // culture - culture to use in translations 
    function repetitionsTotalRandomsHtml(totalRandoms, culture) {
        var str = '';
        str += '<div class="row">';
        str += '    <div class="col-sm-12">';
        str += '        <h5 class="text-warning">' + totalRandoms + ' ' + '<span id="repetitionsTotalRandoms" translation-id="randomKeysGenerated">' + translations.translate('randomKeysGenerated', culture)  + '</span></h5>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for sort direction glyphicon
    // direction - ascending, descending
    function sortGlypHtml(direction) {
        return '<span class="glyphicon glyphicon-sort-by-attributes' + (direction === 'ascending' ? '' : '-alt') + '"></span>';
    }

    // remove glyphicon from table header
    // type - numbers, stars
    function removeGlyp(type) {
        $('#' + type + 'TableHeader').remove('.glyphicon');
    }

    // return html for one table row of repetitions
    // obj - numStar obj
    function repetitionRowHtml(obj) {
        var str = '';
        str += '<tr class="text-center">';
        str += '    <td>' + obj.id + '</td>';
        str += '    <td>' + obj.random + 'x' + '</td>';
        str += '    <td>' + obj.percent.toFixed(2) + '%' + '</td>';
        str += '</tr>';
        return str;
    }

    // built html for repetitions table
    // type - numbers, stars
    // array - array with data to display in the table
    function repetitionsRowsHtml(type, array) {
        var str = '';
        str += '<table id="' + type + 'Table' + '" class="table table-hover">';
        str += '    <thead>';
        str += '        <tr id="' + type + 'TableHeader' + '">';
        str += '            <th class="text-warning text-center"><span id="' + type + 'RepetitionsIdSort' + '" sort-property="id" class="cursor-pointer"># <span class="glyphicon glyphicon-sort"></span></span></th>';
        str += '            <th class="text-warning text-center"><span id="' + type + 'RepetitionsRandomSort' + '" sort-property="random" class="cursor-pointer">x <span class="glyphicon glyphicon-sort"></span></span></th>';
        str += '            <th class="text-warning text-center"><span id="' + type + 'RepetitionsPercentSort' + '" sort-property="percent" class="cursor-pointer">% <span class="glyphicon glyphicon-sort"></span></span></th>';
        str += '        </tr>';
        str += '    </thead>';
        str += '    <tbody>';
                        for (var i = 0; i < array.length; i++) {
                            var obj = array[i];
                            str += repetitionRowHtml(array[i]);    
                        }
        str += '    </tbody>';
        str += '</table>';
        return str;
    }

    // return html to build numbers, stars repetitions
    // numbersArr - array of numbers
    // starsArr - array of stars
    // culture - culture to use in translations 
    // type - numbers, stars
    function repetitionsHtml(numbersArr, starsArr, culture, type) {
        var str = '';
        var array = (type === 'numbers' ? numbersArr : starsArr);
        str += '<div class="row">';
        str += '    <div class="col-sm-12">';
        str += '        <h4 id=' + type + '"RepetitionsLabel" translation-id="' + type + '">' + translations.translate(type, culture) + '</h4>';
        str += '        <div id="' + type + 'TableContainer' + '">';
        str +=              repetitionsRowsHtml(type, array);
        str += '        </div>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // refresh table rows with new sort
    // type = numbers, stars
    // array - data array
    // sortObj - sortObj.property (id, random, percent), sortObj.direction (ascending, descending)
    function refreshTableRows(type, array, sortObj) {
        var html = repetitionsRowsHtml(type, array);
        $('#' + type + 'TableContainer').html(html);
        var $element = $('#' + type + 'TableHeader .cursor-pointer[sort-property="' + sortObj.property + '"]');
        var oldHtml = $element[0].innerText;
        $element.html(oldHtml + ' ' + sortGlypHtml(sortObj.direction));
    }

    // refresh repetitions
    // numbersArr - array of numbers
    // starsArr - array of stars
    // culture - culture to use in translations 
    // totalRandoms - number of times tha was generated a random key
    function refreshRepetitions(numbersArr, starsArr, culture, totalRandoms) {
        var str = '';
        str += repetitionsTotalRandomsHtml(totalRandoms, culture);
        str += repetitionsHtml(numbersArr, starsArr, culture, 'numbers');
        str += repetitionsHtml(numbersArr, starsArr, culture, 'stars');
        $('#panelBodyRepetitions').html(str);
    }

    // return html for clear statistics panel
    function clearStatisticsHtml() {
        var str = '';
        str += '<div class="text-center">';
        str += '    <h4 class="text-danger" translation-id="attentionAllStatsWillBeRestarted"></h4>';
        str +=      buttonHtml({id: 'clearStatistics', translationId: 'clearStatistics', color: 'danger'});
        str += '</div>';
        return str;
    }

    // return html for a statistic panels
    // id - id of the panel
    // titleTranslationId - id translation for the title of the panel
    // panelBodyHtmlContent - html for the panel body
    function statisticsPanelHtml(id, titleTranslationId) {
        var str = '';
        str += '<div class="panel panel-default margin-10px">'
        str += '    <div class="panel-heading">';
        str += '        <h4 class="panel-title">';
        str += '            <a data-toggle="collapse" data-parent="#accordion" href="#' + id + '" id="' + id + 'Label' + '" translation-id="' + titleTranslationId + '"></a>';
        str += '        </h4>';
        str += '    </div>';
        str += '    <div id="' + id + '" class="panel-collapse collapse">';
        str += '        <div id="panelBody' + id + '" class="panel-body"></div>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for statistics accordion
    function statisticsAccordionHtml() {
        var str = '';
        str += '<div class="panel-group" id="accordion">';
        str +=      statisticsPanelHtml('PremiumKey', 'premiumKey');
        str +=      statisticsPanelHtml('Repetitions', 'repetitions');
        str +=      statisticsPanelHtml('ClearStatistics', 'clearStatistics');
        str += '</div>';
        return str;
    }

    // build statistics area
    function statisticsHtml() {
        var str = '';
        str += '<div class="col-sm-4">';
        str += '    <h5 id="statisticsLabel" class="margin-left-10" translation-id="statistics"></h5>';
        str += '    <div class="margin-top-20">';
        str +=          statisticsAccordionHtml();
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // return html for the body of the page
    function bodyHtml() {
        var str = '';
        str += '<h4 id="euromillions" class="margin-left-10" translation-id="euromillions"></h4>';
        str += optionsButtonGroupHtml();
        str += '<hr/>';
        str += '<div class="row">';
        str +=      gridHtml('numbersResult', 'numbersButtons', numbersGridHtml('number'), 'numbers');
        str +=      gridHtml('starsResult', 'starsButtons', numbersGridHtml('star'), 'stars');
                    if (storageManager.haveLocalStorage()) {
                        str += statisticsHtml(); 
                    }
        str += '</div>';
        str += '<br/>';
        return str;
    }

     // return html for modal
     function modalHtml() {
        var str = '';
        str += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
        str += '    <div class="modal-dialog" role="document">';
        str += '        <div class="modal-content">';
        str += '            <div class="modal-header">';
        str += '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        str += '                <div class="modalTitle" id="modalTitle"></div>';
        str += '            </div>';
        str += '            <div class="modal-body">';
        str += '                <div id="modalMsg"></div>';
        str += '            </div>';
        str += '            <div class="modal-footer">';
        str += '                <button id="modalCloseBtn" type="button" class="btn btn-default" data-dismiss="modal" translation-id="close"></button>';
        str += '            </div>';
        str += '        </div>';
        str += '    </div>';
        str += '</div>';
        return str;
    }

    // build and render html for main panel
    // culture - culture to use in translations 
    function renderBody(culture) {
        $('.panel-body').html(bodyHtml());
        $('.container').append(modalHtml());
        $('#panelBodyClearStatistics').html(clearStatisticsHtml());
        refreshAllTranslations(culture);
    }

    // display a modal 
    // title - title of the modal
    // msg - msg to display
    // color - default, primary, success, info, warning, danger
    function showModal(title, msg, color) {
        var textClasses = 'text-default text-primary text-success text-warning text-danger';
        $('#modalTitle').removeClass(textClasses).addClass('text-' + color).html('<h4 class="text-' + color + '">' + title + '</h4>');
        $('#modalMsg').removeClass(textClasses).addClass('text-' + color).html(msg);
        $('#modalCloseBtn').removeClass('btn-default btn-primary btn-success btn-warning btn-danger').addClass('btn-' + color);
        $('#myModal').modal('show');
    }

    // translate title and msg and rander a modal with translated strings on it
    function showTranslatedModal(titleTranslationId, msgTranslationId, color, culture) {
        showModal(translations.translate(titleTranslationId, culture), translations.translate(msgTranslationId, culture), color);
    }

    // return html for help modal msg
    // culture - culture to use in translations 
    function helpMsgHtml(culture) {
        var str = '';
        str += '<h5>' + translations.translate('press', culture) + ' ' + '<span class="text-warning">' + translations.translate('randomKey', culture) + '</span>' + ' ' + translations.translate('toGenerateRandomKey', culture) +  '.</h5>';
        str += '<h5>' + translations.translate('press', culture) + ' ' + '<strong>' + translations.translate('clean', culture) + '</strong>' + ' ' + translations.translate('toUnselectRandomlyGeneratedKey', culture) +  '.</h5>';
        str += '<h5>' + translations.translate('press', culture) + ' ' + '<strong>' + translations.translate('help', culture) + '</strong>' + ' ' + translations.translate('toAccessInformationHowToUse', culture) +  '.</h5>';
        str += '<h5>' + translations.translate('toChangeLanguage', culture) +  '</h5>';
        str += '<h5>' + translations.translate('theUserCanSelect', culture) +  '</h5>';
        str += '<h5>' + translations.translate('whenNumberIsSelected', culture) +  '</h5>';
        str += '<h5>' + translations.translate('numbersSelectedByUserCanOnlyBeDeselected', culture) +  '</h5>';
        str += '<h5>' + translations.translate('userSelectedNumbersAreNotChangedByRandomKeyGeneration', culture) +  '</h5>';
        str += '<p><button type="button" class="btn btn-default btn-xs">#</button>' + ' - ' + translations.translate('unselectedNumbersStars', culture) + '</p>';
        str += '<p><button type="button" class="btn btn-warning btn-xs">#</button>' + ' - ' + translations.translate('numbersSelectedByRandomKey', culture) + '</p>';
        str += '<p><button type="button" class="btn btn-danger btn-xs">#</button>' + ' - ' + translations.translate('numbersSelectedByTheUser', culture) + '</p>';
        str += '<h5>' + translations.translate('statisticsAreBasedOn', culture) +  '</h5>';
        str += '<h5>' + translations.translate('repetitionsShowNumberOfTimes', culture) +  '</h5>';
        str += '<h5>' + translations.translate('columnsRepetitions', culture) +  '</h5>';
        str += '<h5><span class="text-warning">#</span>' + ' ' + translations.translate('number', culture) + ' / ' + translations.translate('star', culture) + '</h5>';
        str += '<h5><span class="text-warning">x</span>' + ' ' + translations.translate('numberTimesGenerated', culture) + '</h5>';
        str += '<h5><span class="text-warning">%</span>' + ' ' + translations.translate('percentageTimesGenerated', culture) + '</h5>';
        str += '<h5>' + translations.translate('toSortColumnPressColumnHeader', culture) +  '</h5>';
        str += '<h5><span class="text-warning glyphicon glyphicon-sort"></span>' + ' ' + translations.translate('unsortedColumn', culture) + '</h5>';
        str += '<h5><span class="text-warning glyphicon glyphicon-sort-by-attributes"></span>' + ' ' + translations.translate('columnSortedAscending', culture) + '</h5>';
        str += '<h5><span class="text-warning glyphicon glyphicon-sort-by-attributes-alt"></span>' + ' ' + translations.translate('columnSortedDescending', culture) + '</h5>';
        str += '<h5>' + translations.translate('numbersOrStarsSelectedByUserAreNotCounted', culture) +  '</h5>';
        str += '<h5><span class="text-danger">' + translations.translate('clearStatistics', culture) + '</span>' + ' ' + translations.translate('restartsAllStatistics', culture) + '</h5>';
        str += '<h5 class="text-danger">' + translations.translate('ifYouClearTheMemory', culture) +  '</h5>';
        str += '<h5>' + translations.translate('goodLuck', culture) +  '</h5>';
        return str;
    }

    // render a modal with help text
    // culture - culture to use in translations
    function renderHelpModal(culture) {
        showModal(translations.translate('help', culture), helpMsgHtml(culture), 'default');
    }

    // return true if element is lock by user
    // $element - jquery wrapped element
    function isLock($element) {
        return $element.hasClass('btn-danger');    
    }

    // return true if element is lock by random key
    // $element - jquery wrapped element
    function isSelect($element) {
        return $element.hasClass('btn-warning');
    }
    
    // return true if element is not lock by random key or by user
    // $element - jquery wrapped element
    function isFree($element) {
        return !(isSelect($element) || isLock($element));
    }

    // refresh number/star button color display
    // $element - jquery wrapped element
    // action - free, select, lock
    function refreshNumberKey($element, action) {
        if (action == 'free') {
            $element.removeClass('btn-warning btn-danger');
        } else if (action == 'select') {
            $element.addClass('btn-warning');        
        } else {
            $element.addClass('btn-danger');
        }
    }

    // change buttons display based on a list of id's
    // type - number, star
    // array - array with id's
    function setSelected(type, array) {
        $.each(array, function (indexInArray, valueOfElement) { 
             $('#' + type + valueOfElement.toString()).addClass('btn-warning');
        });
    }

    // set display to free for all numbers/stars selected by random key
    function clearGrids() {
        $('#numbersButtons .btn-warning').removeClass('btn-warning');
        $('#starsButtons .btn-warning').removeClass('btn-warning');
    }

    return {
        renderBody: renderBody,
        refreshAllTranslations: refreshAllTranslations,
        refreshResult: refreshResult,
        isFree: isFree,
        refreshNumberKey: refreshNumberKey,
        refreshPremiumKey: refreshPremiumKey,
        refreshRepetitions: refreshRepetitions,
        refreshTableRows: refreshTableRows,
        renderHelpModal: renderHelpModal,
        showTranslatedModal: showTranslatedModal,
        setSelected: setSelected,
        clearGrids: clearGrids
    };
   
});