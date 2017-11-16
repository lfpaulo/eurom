define(['underscore'], function(_) {
    'use strict';

    // return a decimal with x number of decimal places
    // dec - decimal to format
    // places - number of decimal places
    function decimalPlaces(dec, places) {
        return parseFloat(Math.round(dec * 100) / 100).toFixed(places);
    }

    // return a random integer between min (inclusive) and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // sort an array of int's
    // array - array to sort
    function sortIntArray(array) {
        return array.sort(function(a, b){return a-b});
    }

    // create a new deep copy not related to the first one
    function arrayDeepCopy(array) {
        return JSON.parse(JSON.stringify(array));
    }

    // returns the position of an object in the array whose property value matches the past values (if not found return -1)
    // array - array to find obj
    // prop - property name
    // value - value to find
    function objIndexOf(array, prop, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }

    // add a zero on lef side of a number if is less then 10
    // str - string with number
    function addZero(str) {
        return str.length < 2 ? '0' + str : str;
    }
    
    // return an array and with a zero on lef side of a item if is less then 10
    // array - array of int's to operate
    // note return an array of strings (sorted if input array was sorted)
    function stringuifyIntArray(array) {
        var result = [];
        _.each(array, function (element) { 
            result.push(addZero(element.toString()));
        });
        return result;
    }

    // update a property in a object inside an array
    // array - array of obj's
    // searchProp - property name where is value to find
    // searchValue - value to find
    // updateProperty - property name to update with new value
    // updateValue - new value of the update property 
    function updateObjInArray(array, searchProp, searchValue, updateProperty, updateValue) {
        array[objIndexOf(array, searchProp, searchValue)][updateProperty] = updateValue;
    }

    // change a property value of an array item
    // array - array to operate
    // prop - property to change
    // value - value to set
    function setDefaultValue(array, prop, value) {
        return _.map(array, function (item) {  
            item[prop] = value;
            return item;
        });
    }

    // return an obj with occurrences that the past property has the past value 
    // array - array of obj's
    // searchProp - property name where is value to find
    // searchValue - value to find
    function findObj(array, searchProp, searchValue) {
        return _.filter(array, function (item) {  
            return item[searchProp] === searchValue;
        });
    }

    // return an array with occurrences that the past property has the past value 
    // array - array of obj's
    // searchProp - property name where is value to find
    // searchValue - value to find
    function filterObj(array, searchProp, searchValue) {
        return _.filter(array, function (item) {  
            return item[searchProp] === searchValue;
        });
    }

    // returns an array with occurrences where the passed property does not have the passed value
    // array - array of obj's
    // searchProp - property name where is value to reject
    // rejectValue - value to reject
    function filterOtherThanObj(array, searchProp, rejectValue) {
        return _.filter(array, function (item) {  
            return item[searchProp] !== rejectValue;
        });
    }

    // return array witout reject items
    // array - array to extract reject objs
    // rejectArr - array with reject objs
    function rejectItem(array, rejectArr) {
        return _.reject(array, function (item) {  
            return _.indexOf(rejectArr, item) !== -1;
        });
    }

    // remove obj's from an obj's array by id
    // array - array to remove obj's
    // rejectArr - array if obj's to reject
    function rejectObjs(array, rejectArr) {
        return _.reject(array, function (item) {  
            return findObj(rejectArr, 'id', item.id).length > 0;
        });
    }

    // return the number of occurrences that the past property has the past value 
    // array - array of obj's
    // searchProp - property name where is value to find
    // searchValue - value to find
    function countObj(array, searchProp, searchValue) {
        return filterObj(array, searchProp, searchValue).length;
    }

    // sort an obj's array by one property
    // array - array to sort
    // prop - property to sort by
    function sortObjs(array, prop) {
        return _.sortBy(array, prop);
    }

    // return a shuffled copy of the array
    // array - array to shuffle
    function shuffle(array) {
        return _.shuffle(array);
    }

    // return an array with the values of the id objects contained in the array passed
    // array - array to operate
    function getIds(array) {
        return _.pluck(array, 'id');
    }

    // return an array that is concatenation of the two obj array's 
    // baseArr - base array
    // extendArr - array to push
    function pushObjsArray(baseArr, extendArr) {
        var result = arrayDeepCopy(baseArr);
        for (var i = 0; i < extendArr.length; i++) {
            result.push(extendArr[i]);
        }
        return result;
    }

    return {
        decimalPlaces: decimalPlaces,
        getRandomInt: getRandomInt,
        sortIntArray: sortIntArray,
        arrayDeepCopy: arrayDeepCopy,
        addZero: addZero,
        stringuifyIntArray: stringuifyIntArray,
        updateObjInArray: updateObjInArray,
        setDefaultValue: setDefaultValue,
        findObj: findObj,
        filterObj: filterObj,
        filterOtherThanObj: filterOtherThanObj,
        rejectItem: rejectItem,
        rejectObjs: rejectObjs,
        countObj: countObj,
        sortObjs: sortObjs,
        shuffle: shuffle,
        getIds: getIds,
        pushObjsArray: pushObjsArray
    };

});