define(['underscore', 'translations'], function (_, translations) {
    'use strict';

    // pt-PT Portugal
    // fr-FR' France
    // de-DE Germany
    // en-GB United Kingdom
    // es-ES Spain
    var supportedCultures = ['de-DE', 'en-GB', 'es-ES', 'fr-FR', 'pt-PT'];
    var currentCulture = 'en-GB';
    var translationsArr = translations.getTranslations();
    
    // return the current culture of the browser (if browser not support language return null)
    function navigatorLanguage() {
        return 'language' in navigator ? navigator.language : null;
    }

    // return true if culture is supported by app, otherwise return false
    // culture - culture to check if is a supported culture
    function isSupportedCulture(culture) {
        return _.indexOf(supportedCultures, culture, true) > -1 ? true : false;
    }

    // return initial culture depending on the browser culture (if there is no supported culture for the browser culture configures for en-GB)
        function initialCulture() {
        var navLanguage = navigatorLanguage();
        if (navLanguage !== null && isSupportedCulture(navLanguage)) {
            currentCulture = navLanguage;
        }
        return currentCulture;
    }

    // returns the translation for the provided id or null if not found 
    // id - translation id
    // culture - culture used to translate (if undefined use global var euromCulture)
    function translate(id, culture) {
        var result = _.find(translationsArr, function(item) {
            return item.id === id;
        });
        if (typeof result !== 'undefined') {
            return result[culture];
        } 
        return null;
    }

    return {
        initialCulture: initialCulture,
        translate: translate
    };
})