

requirejs.config({
    baseUrl: "./js",
    paths: {
        'jquery': 'lib/jquery',
        'bootstrap': 'lib/bootstrap',
        'underscore': 'lib/underscore',
        'app': 'app/app',
        'utils': 'app/utils',
        'html-factory': 'app/html-factory',
        'local-storage-manager': 'app/local-storage-manager',
        'translations-manager': 'app/translations-manager',
        'translations': 'translations/translations'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

requirejs(['jquery', 'app'], function ($, app) {  
    'use strict';
    $(function () {  
        app.start();
    });
    
});