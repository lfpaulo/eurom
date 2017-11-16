define([], function() {
    'use strict';
    
    // return true if browser supports local storage otherwise return false
    function haveLocalStorage() {
        return 'localStorage' in window;
    }

    // get a var from local storage (return null if not found)
    // key - name of item in local storage
    function getItem(key) {
        if (haveLocalStorage()) {
            return JSON.parse(window.localStorage.getItem(key));    
        }
        return null;
    }

    // copy an var to local storage
    // key - name of item in local storage
    // value - array to copy from local var to local storage
    function copyItem(key, value) {
        if (haveLocalStorage()) {
            window.localStorage.setItem(key, JSON.stringify(value));    
        }
    }

    return {
        haveLocalStorage: haveLocalStorage,
        getItem: getItem,
        copyItem: copyItem
    }

});