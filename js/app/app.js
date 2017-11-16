define(['html-factory', 'translations-manager', 'utils', 'local-storage-manager'], function (htmlFactory, translationsManager, utils, storageManager) {  
    'use strict';

    var totalRandoms = 0;
    var currentCulture = '';
    var numbersArr = [];
    var starsArr = [];
    var numbersPremium = [];
    var starsPremium = [];
    var numbersCurrentSort = {
        property: 'id',
        direction: 'ascending'
    };
    var starsCurrentSort = {
        property: 'id',
        direction: 'ascending'
    };

    // number/star prototype
    // id - obj id
    // state - free, select, lock
    // random - number of times the number/star was generated randomly
    function numStar(id, state, random) {
        this.id = id;
        this.state = state;
        this.random = random;
    }

    // fill an array of numbers/stars with numStar obj's
    // type - numbers, stars
    function createResultArray(type) {
        for (var i = 0; i < (type === 'numbers' ? 50 : 12); i++) {
            var obj = new numStar((i + 1), 'free', 0);
            (type === 'numbers' ? numbersArr : starsArr).push(obj);
        }
    }

    // return a copy of original array with calculated property percent
    // array - array of numStar obj's
    function getCompleteResultArray(array) {
        var result = utils.arrayDeepCopy(array);
        for (var i = 0; i < result.length; i++) {
            var obj = result[i];
            obj.percent = (obj.random > 0 ? parseFloat(utils.decimalPlaces(((obj.random / totalRandoms) * 100), 2)) : 0);
        }
        return result;
    }

    // return a sorted array using currentSort properties
    // array - array to sort
    // currentSort - property, direction
    function sortArray(array, currentSort) {
        array = utils.sortObjs(array, currentSort.property);
        if (currentSort.direction === 'descending') {
            array = array.reverse();
        }
        return array;
    }

    // copy numbersArr, starsArr and totalRandoms to local storage
    function copyStatisticsToStorage() {
        storageManager.copyItem('numbersArr', numbersArr);
        storageManager.copyItem('starsArr', starsArr);
        storageManager.copyItem('totalRandoms', totalRandoms);
        storageManager.copyItem('numbersPremium', numbersPremium);
        storageManager.copyItem('starsPremium', starsPremium);
    }

    // return obj state
    // type - number, star
    // id - obj id
    function getState(type, id) {
        return (utils.findObj((type === 'number' ? numbersArr : starsArr), 'id', id)).state;
    }

    // return true if all possible numbers/stars was select or lock
    // array - array to count obj's
    // type - number, star
    function isKeyFull(array, type) {
        return utils.countObj(array, 'state', 'select') + utils.countObj(array, 'state', 'lock') === (type === 'number' ? 5 : 2);
    }

    // if numbers/stars key is full show an alert and return true otherwise return false
     // type - number, star
     function reachedLimit(type) {
        if (isKeyFull((type === 'number' ? numbersArr : starsArr), type)) {
            return true;
        }
        return false;
    }

    // set all obj's state to free
    // array - array of obj's
    function freeAll(array) {
        array = utils.setDefaultValue(array, 'state', 'free');
    }

    // load numbersArr and starsArr from local storage (if not exist build and initialize new ones)
    // type - numbers, stars
    function loadHistory(type) {
        var key = type === 'numbers' ? 'numbersArr' : 'starsArr';
        var item = storageManager.getItem(key);
        if (item === null) {
            createResultArray(type);
            if (type === 'numbers') {
                storageManager.copyItem(key, numbersArr);
            } else {
                storageManager.copyItem(key, starsArr);
            }
        } else {
            if (type === 'numbers') {
                numbersArr = utils.arrayDeepCopy(item);
            } else {
                starsArr = utils.arrayDeepCopy(item);
            }
            if (type === 'numbers') {
                freeAll(numbersArr);
            } else {
                freeAll(starsArr);
            }
            if (type === 'numbers') {
                storageManager.copyItem(key, numbersArr);
            } else {
                storageManager.copyItem(key, starsArr);
            }
        }
    }

    // initialize vars
    function startVars() {
        var oldLanguage = storageManager.getItem('language');
        var oldTotalRandoms = storageManager.getItem('totalRandoms');
        var oldNumbersPremium = storageManager.getItem('numbersPremium');
        var oldStarsPremium = storageManager.getItem('starsPremium');
        loadHistory('numbers');
        loadHistory('stars');
        if (oldLanguage !== null) {
            currentCulture = oldLanguage;
        } else {
            currentCulture = translationsManager.initialCulture();
            storageManager.copyItem('language', currentCulture);
        }
        if (oldTotalRandoms !== null) {
            totalRandoms = oldTotalRandoms;
        } else {
            storageManager.copyItem('totalRandoms', totalRandoms);
        }
        if (totalRandoms > 0) {
            if (oldNumbersPremium !== null) {
                numbersPremium = oldNumbersPremium;
            } else {
                numbersPremium = utils.getIds(getPremiumKey('numbers'));
                storageManager.copyItem('numbersPremium', numbersPremium);
            }
            if (oldStarsPremium !== null) {
                starsPremium = oldStarsPremium;
            } else {
                starsPremium = utils.getIds(getPremiumKey('stars'));
                storageManager.copyItem('starsPremium', starsPremium);
            }
        }
    }

    // change state property of item in result array (numbersArr, starsArr)
    // type - number, star
    // selectedNumber - selected number/star
    // action - free, select, lock
    function arrayObjUpdateState(type, selectedNumber, action) {
        utils.updateObjInArray((type === 'number' ? numbersArr : starsArr), 'id', selectedNumber, 'state', action);
    }

    // changes the state of objects that are selected to not selected
    // array - array to update 
    function cleanSelectedFromArr(array) {
        var selected = utils.filterObj(array, 'state', 'select');
        for (var i = 0; i < selected.length; i++) {
            var item = selected[i];
            utils.updateObjInArray(array, 'id', item.id, 'state', 'free');
        }
    }

    // changes the state of objects in array to selected
    // array - array to update
    // selected - array with selected obj id's
    function addSelectedToArray(array, selected) {
        for (var i = 0; i < selected.length; i++) {
            var item = selected[i];
            var obj = utils.findObj(array, 'id', item);
            if (typeof obj !== undefined && obj[0].state !== 'lock') {
                utils.updateObjInArray(array, 'id', item, 'state', 'select');
            }
        }
    }

    // return array with the id's of locked obj's
    function getLocked(array) {
        return utils.filterObj(array, 'state', 'lock');
    }

    // returns an array filled with random integers (holds the array values passed)
    // type - numbers, stars
    // array - array with locked values
    function getRandomKey(type, array) {
        var result = utils.arrayDeepCopy(array);
        while (result.length < (type === 'numbers' ? 5 : 2)) {
            var number = utils.getRandomInt(1, (type === 'numbers' ? 50 : 12));
            if (result.indexOf(number) === -1) {
                result.push(number);
            }
        }
        return result;
    }

    // update property on numbersArr/starsArr where key is selected by random key generation
    // updateArr - array to update
    // selectedArr - array with numbers/stars generated by random key
    function updateArrRandomProp(updateArr, selectedArr) {
        for (var i = 0; i < selectedArr.length; i++) {
            var item = selectedArr[i];
            var oldValue = (utils.findObj(updateArr, 'id', item))[0].random;
            utils.updateObjInArray(updateArr, 'id', item, 'random', oldValue + 1);
        }
    }

    // return a sorted generated key with the most randomly generated numbers/stars
    // type - numbers, stars
    function getPremiumKey(type) {
        var result = [];
        var nrItens = type === 'numbers' ? 5 : 2;
        var array = utils.arrayDeepCopy((type === 'numbers' ? numbersArr : starsArr));
        array = utils.sortObjs(array, 'random').reverse();
        while (result.length < nrItens) {
            var item = array[0];
            var sameValueArr = (utils.filterObj(array, 'random', item.random));
            var freeSpace = nrItens - result.length;
            if (freeSpace >= sameValueArr.length) {
                result = utils.pushObjsArray(result, sameValueArr);
                array = utils.rejectObjs(array, sameValueArr);
            } else {
                sameValueArr = utils.shuffle(sameValueArr);
                for (var i = 0; i < freeSpace; i++) {
                    var item = sameValueArr[utils.getRandomInt(0, sameValueArr.length - 1)];
                    result.push(item);
                    array = utils.rejectObjs(array, [item]);
                    sameValueArr = utils.rejectObjs(sameValueArr, [item]);
                }
            }
        }
        return utils.sortObjs(result, 'id');
    }

    // recalculate premium key and load var's with results
    function recalculatePremiumKey() {
        numbersPremium = utils.getIds(getPremiumKey('numbers'));
        starsPremium = utils.getIds(getPremiumKey('stars'));
        storageManager.copyItem('numbersPremium', numbersPremium);
        storageManager.copyItem('starsPremium', starsPremium);
        htmlFactory.refreshPremiumKey(numbersPremium, starsPremium, currentCulture);    
    }

    // change array state of selected numbers/stars to free and refresh display
    function cleanSelected() {
        cleanSelectedFromArr(numbersArr);
        cleanSelectedFromArr(starsArr);
        htmlFactory.clearGrids();
        refreshResult('numbers');
        refreshResult('stars');
        copyStatisticsToStorage();
    }

    // change array state of numbers/stars to select and refresh display
    // type - numbers, stars
    // array - array with select values
    function setSelected(type, array) {
        addSelectedToArray((type === 'number' ? numbersArr : starsArr), array);
        htmlFactory.setSelected(type, array);
    }

    // refresh numbers/stars result key
    // type - numbers, stars
    // resultArr (optional) - array of strings with results (must be sorted if whant sorted results)
    function refreshResult(type, resultArr) {
        var array = resultArr;
        if (typeof array === 'undefined') {
            array = utils.stringuifyIntArray(utils.sortIntArray(utils.getIds(utils.filterOtherThanObj((type === 'numbers' ? numbersArr : starsArr), 'state', 'free'))));
        }
        htmlFactory.refreshResult(type, array);
    }

    // refresh all translations and update var
    // culture - culture to aply
    function changeCultureClick(culture) {
        currentCulture = culture;
        storageManager.copyItem('language', culture);
        htmlFactory.refreshAllTranslations(culture);
    }

    // show modal with help
    function helpBtnClick() {
        htmlFactory.renderHelpModal(currentCulture);
    }

    // clean numbers/stars grid
    function cleanClick() {
        cleanSelected();
    }

    // generate a random key
    function randomKeyClick() {
        totalRandoms++;
        var numbersLock = utils.getIds(getLocked(numbersArr));
        var starsLock = utils.getIds(getLocked(starsArr));
        var numbersRandomKey = utils.sortIntArray(getRandomKey('numbers', numbersLock));
        var starsRandomKey = utils.sortIntArray(getRandomKey('stars', starsLock));
        var selectedNumbers = utils.rejectItem(numbersRandomKey, numbersLock);
        var selectedStars = utils.rejectItem(starsRandomKey, starsLock);
        cleanSelected();
        setSelected('number', selectedNumbers);
        setSelected('star', selectedStars);
        refreshResult('numbers', utils.stringuifyIntArray(numbersRandomKey));
        refreshResult('stars', utils.stringuifyIntArray(starsRandomKey));
        copyStatisticsToStorage();
        updateArrRandomProp(numbersArr, selectedNumbers);
        updateArrRandomProp(starsArr, selectedStars);
        recalculatePremiumKey();
        var numbersCompleteResult = getCompleteResultArray(numbersArr);
        var starsCompleteResult = getCompleteResultArray(starsArr);
        htmlFactory.refreshRepetitions(numbersCompleteResult, starsCompleteResult, currentCulture, totalRandoms);
        htmlFactory.refreshTableRows('numbers', sortArray(numbersCompleteResult, numbersCurrentSort), numbersCurrentSort);
        htmlFactory.refreshTableRows('stars', sortArray(starsCompleteResult, starsCurrentSort), starsCurrentSort);
        attachStatisticsClickEvents();
    }

    // deal with a number/star click
    // element - element that triggered the event
    function numberClick(element) {
        var selectedNumber = Number(element.textContent);
        var type = element.id.substring(0, element.id.indexOf(selectedNumber)); // extracts type (number, star)
        var $element = $(element);
        if (htmlFactory.isFree($element)) {
            if (!reachedLimit(type)) {
                arrayObjUpdateState(type, selectedNumber, 'lock');
                htmlFactory.refreshNumberKey($element, 'lock');    
            } else {
                htmlFactory.showTranslatedModal('completeKey', (type == 'number' ? 'moreThen5Numbers' : 'moreThen2Stars'), 'warning', currentCulture);
            }
        } else {
            arrayObjUpdateState(type, selectedNumber, 'free');
            htmlFactory.refreshNumberKey($element, 'free')
        }
        refreshResult(type === 'number' ? 'numbers' : 'stars');
        storageManager.copyItem((type === 'number' ? 'numbersArr' : 'starsArr'), (type === 'number' ? numbersArr : starsArr));
    }

    // sort an repetition collumn
    // element - element that triggered the event
    function sortClick(element) {
        var $element = $(element);
        var id = $element[0].id;
        var type = (id.indexOf('numbers') !== -1 ? 'numbers' : 'stars');
        var prop = $element.attr('sort-property');
        var array = (type === 'numbers' ? getCompleteResultArray(numbersArr) : getCompleteResultArray(starsArr));
        var currentSort = (type === 'numbers' ? numbersCurrentSort : starsCurrentSort);
        if (currentSort.property === prop) {
            currentSort.direction = (currentSort.direction === 'ascending' ? 'descending' : 'ascending');
        } else {
            currentSort.property = prop;
            currentSort.direction = 'ascending';
        }
        array = utils.sortObjs(array, prop);
        if (currentSort.direction === 'descending') {
            array = array.reverse();
        }
        htmlFactory.refreshTableRows(type, array, currentSort);
    }

    // clear all statistics
    function clearStatisticsClick() {
        totalRandoms = 0;
        utils.setDefaultValue(numbersArr, 'random', 0);
        utils.setDefaultValue(starsArr, 'random', 0);
        numbersPremium = [];
        starsPremium = [];
        numbersCurrentSort = {
            property: 'id',
            direction: 'ascending'
        };
        starsCurrentSort = {
            property: 'id',
            direction: 'ascending'
        };
        copyStatisticsToStorage();
        htmlFactory.refreshPremiumKey(numbersPremium, starsPremium, currentCulture);
        var numbersCompleteResult = getCompleteResultArray(numbersArr);
        var starsCompleteResult = getCompleteResultArray(starsArr);
        htmlFactory.refreshRepetitions(numbersCompleteResult, starsCompleteResult, currentCulture, totalRandoms);
        htmlFactory.refreshTableRows('numbers', sortArray(numbersCompleteResult, numbersCurrentSort), numbersCurrentSort);
        htmlFactory.refreshTableRows('stars', sortArray(starsCompleteResult, starsCurrentSort), starsCurrentSort);
        attachStatisticsClickEvents();

        htmlFactory.showTranslatedModal('success', 'statisticsHaveBeenRestarted', 'default', currentCulture);
    }

    // attach click events
    function attachClickEvents() {
        $('#portugueseFlagBtn').on('click', function () {
            changeCultureClick('pt-PT');  
        });
        $('#usaFlagBtn').on('click', function () {  
            changeCultureClick('en-GB');
        });
        $('#frenchFlagBtn').on('click', function () {  
            changeCultureClick('fr-FR');
        });
        $('#germanFlagBtn').on('click', function () {  
            changeCultureClick('de-DE');
        });
        $('#spanishFlagBtn').on('click', function () {  
            changeCultureClick('es-ES');
        });
        $('#helpBtn').on('click', function () {  
            helpBtnClick();
        });
        $('#cleanBtn').on('click', function () {  
            cleanClick();
        });
        $('#randomKeyBtn').on('click', function () {  
            randomKeyClick();
        });
        $('#numbersButtons').on('click', '.btn',function () {  
            numberClick(this);
        });
        $('#starsButtons').on('click', '.btn',function () {  
            numberClick(this);
        });
        $('#clearStatistics').on('click', function () {  
            clearStatisticsClick();
        });
        attachStatisticsClickEvents();
    }

    // attach click events in statistics area
    function attachStatisticsClickEvents() {
        $('#numbersTableContainer').on('click', '.cursor-pointer',function () {  
            sortClick(this);
        });
        $('#starsTableContainer').on('click', '.cursor-pointer',function () {  
            sortClick(this);
        });
    }

    // start app
    function start() {
        startVars();
        var numbersArrComplete = getCompleteResultArray(numbersArr);
        var starsArrComplete = getCompleteResultArray(starsArr);
        htmlFactory.renderBody(currentCulture);
        htmlFactory.refreshPremiumKey(numbersPremium, starsPremium, currentCulture);
        htmlFactory.refreshRepetitions(numbersArrComplete, starsArrComplete, currentCulture, totalRandoms);
        htmlFactory.refreshTableRows('numbers', sortArray(numbersArrComplete, numbersCurrentSort), numbersCurrentSort);
        htmlFactory.refreshTableRows('stars', sortArray(starsArrComplete, starsCurrentSort), starsCurrentSort);
        attachClickEvents();
    }
    
    return {
        start: start
    };

});