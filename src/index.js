/**
 * Filter And Map Function's Object arguments
 * @typedef filterAndMapObject
 * @property {Number} [size=Infinity] - Number of data to return
 * @property {Number} [startIndex=0] - Determines the index value to start with
 * @property {Array} thisArgs - The object to be used as the current object
 */


/**
 * Binary Search Find Index Function
 * @param {Array} array 
 * @param {Number} number 
 * @param {(array: Array, index: Number) => Number} operator 
 * @returns 
 */
function binarySearchFindIndex(array, number, operator = (array, index) => array[index]) {
    let startIndex = 0;
    let endIndex = array.length;

    while (startIndex < endIndex) {
        const middleIndex = Math.floor((endIndex + startIndex) / 2);
        const middleValue = operator(array, middleIndex);

        if (middleValue === number) {
            return middleIndex + 1;
        } else if (middleValue > number) {
            endIndex = middleIndex == endIndex ? middleIndex - 1 : middleIndex;
        } else {
            startIndex = middleIndex == startIndex ? middleIndex + 1 : middleIndex;
        }
    }
    return startIndex;
}




/**
 * Checks if the entered objects are the same
 * @param {Object} object1 
 * @param {Object} object2 
 * @returns {Boolean}
 */

function sameObject(object1, object2) {
    const objectEnt1 = Object.entries(object1);
    const objectEnt2 = Object.entries(object2);

    if (objectEnt1.length != objectEnt2.length) return false;

    for (const [key, value_1] of objectEnt1) {
        const value_2 = object2[key];
        if (!sameValue(value_1, value_2)) return false;
    }
    return true;
}

/**
 * Checks if the entered values are the same
 * @param {*} value1 
 * @param {*} value2 
 * @returns {Boolean}
 */

function sameValue(value1, value2) {
    if (value1 === value2) return true;
    if (isNaN(value1) && isNaN(value2)) return true;

    const pro1 = Object.prototype.toString.call(value1);
    const pro2 = Object.prototype.toString.call(value2);

    // If the entered values are not the same type, return false
    if (pro1 !== pro2) return false;

    // Check based on the type of the entered value
    // String, Number, Boolean, Array, Object
    switch (pro1) {
        case "[object String]":
        case "[object Number]":
        case "[object Boolean]": {
            return false;
        }
        case "[object Array]": {
            return sameArray(value1, value2);
        }
        case "[object Object]": {
            return sameObject(value1, value2);
        }
    }

    // Map, Set, RegExp, Date, ArrayBuffer
    if (value1 instanceof Set && value2 instanceof Set) return sameArray([...value1], [...value2]);
    if (value1 instanceof Map && value2 instanceof Map) return sameArray([...value1.entries()], [...value2.entries()]);
    if (value1 instanceof RegExp && value2 instanceof RegExp) return (value1.source === value2.source) && (value1.flags === value2.flags);
    if (value1 instanceof Date && value2 instanceof Date) return value1.getTime() === value2.getTime();
    if (value1 instanceof ArrayBuffer && value2 instanceof ArrayBuffer) {
        if (value1.byteLength !== value2.byteLength) return false;
        return sameArray(new Uint8Array(value1), new Uint8Array(value2));
    }

    // prototype, constructor, name, toString
    if (value1?.prototype !== undefined) return value1?.prototype === value2?.prototype;
    if (value1?.constructor !== undefined) return value1?.constructor === value2?.constructor;
    if (value1?.constructor?.name !== undefined) return value1?.constructor?.name === value2?.constructor?.name;
    if (value1?.constructor?.toString() !== undefined) return value1?.constructor?.toString() === value2?.constructor?.toString();
    if (value1?.toString() !== undefined) return value1?.toString() === value2?.toString();

    // Symbol, BigInt, Error, Promise, Function
    if (value1 instanceof Symbol && value2 instanceof Symbol) return value1.description === value2.description;
    if (value1 instanceof BigInt && value2 instanceof BigInt) return value1.toString() === value2.toString();
    if (value1 instanceof Error && value2 instanceof Error) return sameObject(value1, value2);
    if (value1 instanceof Promise && value2 instanceof Promise) return sameValue(value1.then(), value2.then());
    if (value1 instanceof Function && value2 instanceof Function) return value1.toString() === value2.toString();
    return false;
}


/**
 * Checks if the entered arrays are the same array
 * @param {Array} array - Main array
 * @param {Array} otherArray - Array to check
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5];
 * 
 * // Then let's create a new array and check if it's the same array
 * const otherArray = [1, 2, 3, 4, 5];
 * 
 * if (ArrayUtil.sameArray(array, otherArray)) {
 *   console.log("Both arrays are the same!");
 * } else {
 *   console.log("No two arrays are the same :(");
 * }
 * @returns {Boolean}
 */

function sameArray(array, otherArray) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (!Array.isArray(otherArray)) throw new TypeError(`The "otherArray" data you entered (${otherArray}) is not an Array!`);

    // If the length of the arrays are different, return false
    if (array.length !== otherArray.length) return false;

    // Check if the entered values are the same
    for (let i = 0; i < array.length; ++i) {
        const value1 = array[i];
        const value2 = otherArray[i];

        // If the entered values are not the same, return false
        if (!sameValue(value1, value2)) return false;
    }
    return true;

}

/**
 * Returns all permutations of the given array
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const perms = ArrayUtil.permutations([1, 2, 3]);
 * console.log(perms); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * @returns {Array<Array>} All possible permutations of the input array
 */
function permutations(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);

    const result = [];

    function permute(arr, m = []) {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                const current = arr.slice();
                const next = current.splice(i, 1);
                permute(current.slice(), m.concat(next));
            }
        }
    }

    permute(array);
    return result;
}


/**
 * Filters only even numbers from the array
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const evens = ArrayUtil.onlyEvens([1, 2, 3, 4, 5, 6]);
 * console.log(evens); // [2, 4, 6]
 * 
 * @returns {Array} Array with only even numbers
 */
function onlyEvens(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    return array.filter(value => typeof value === 'number' && value % 2 === 0);
}


/**
 * Filters only odd numbers from the array
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const odds = ArrayUtil.onlyOdds([1, 2, 3, 4, 5, 6]);
 * console.log(odds); // [1, 3, 5]
 * 
 * @returns {Array} Array with only odd numbers
 */
function onlyOdds(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    return array.filter(value => typeof value === 'number' && value % 2 !== 0);
}


/**
 * Returns a reversed copy of the array
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const reversed = ArrayUtil.reversed([1, 2, 3]);
 * console.log(reversed); // [3, 2, 1]
 * 
 * @returns {Array} A new array with elements in reverse order
 */
function reversed(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    return [...array].reverse();
}

/**
 * Returns the maximum value from the array
 * @param {Array} array - Main array
 * @param {(value: any, index: Number, this: Array) => Boolean} [callback] - Used to check the value (Should return boolean)
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const max = ArrayUtil.max([1, 2, 3, 10, 4]);
 * console.log(max); // 10
 * 
 * @returns {number} The largest number in the array
 */
function max(array, callback = (value) => value) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof callback !== "function") throw new TypeError(`The "callback" data you entered (${callback}) is not a function!`);

    let maxNum = -Infinity;
    let maxVal;

    for (let i = 0; i < array.length; ++i) {
        const value = array[i];
        if (typeof value !== "number") continue;

        const num = callback(value, i, this);
        if (num > maxNum) {
            maxNum = num;
            maxVal = value;
        }
    }
    return maxVal;
}


/**
 * Returns the minimum value from the array
 * @param {Array} array - Main array
 * @param {(value: any, index: Number, this: Array) => Boolean} [callback] - Used to check the value (Should return boolean)
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const min = ArrayUtil.min([1, 2, 3, 10, 4]);
 * console.log(min); // 1
 * 
 * @returns {number} The smallest number in the array
 */
function min(array, callback = (value) => value) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof callback !== "function") throw new TypeError(`The "callback" data you entered (${callback}) is not a function!`);

    let minNum = -Infinity;
    let minVal;

    for (let i = 0; i < array.length; ++i) {
        const value = array[i];
        if (typeof value !== "number") continue;

        const num = callback(value, i, this);
        if (num < minNum) {
            minNum = num;
            minVal = value;
        }
    }
    return minVal;
}


/**
 * Returns index values by searching the entered value in the array
 * @param {Array} array - Main array
 * @param {any} searchValue - Value to search
 * @param {Number} [length=Infinity] - Maximum length of array to return
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 1]
 * 
 * // Then let's enter the value to look for
 * const indexs = ArrayUtil.allIndexOf(array, 1)
 * 
 * console.log(index)
 * // [0, 5]
 * @returns {Array<Number>} - Returns empty array if no value was found, an array if found
 */

function allIndexOf(array, searchValue, length) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (length !== undefined && typeof length !== "number") throw new TypeError(`The "length" data you entered (${length}) is not a number!`);

    const allIndex = [];

    for (let i = 0; i < array.length; ++i) {
        // If the entered value and the searched value are the same, add the index value to the array
        if (sameValue(array[i], searchValue)) {
            allIndex.push(i);

            // Return array if "length" equals 1

            // Not 0 because we check first and then reduce
            // If we reduced first and then checked we would check if it equals 0
            if (length <= 1) return allIndex;
            length -= 1;
        }
    }
    return allIndex;
}




/**
 * Returns the index of values that match the function.
 * @param {Array} array - Main array
 * @param {( value: any, index: Number, this: Array ) => Boolean} findIndexCallback - For filter function (Should return boolean)
 * @param {Number} [length=Infinity] - Maximum length of array to return
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = ["Hello", "World", "Hi", "!"]
 * 
 * // And by entering a function, let's return the index values of the values we want.
 * const indexs = ArrayUtil.findIndexAll(array, value => value.startsWith("H"))
 * 
 * console.log(indexs)
 * // [0, 1]
 * @returns {Array<Number>} - Returns empty array if no value was found, an array if found
 */

function findIndexAll(array, findIndexCallback, length) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof findIndexCallback !== "function") throw new TypeError(`The "findIndexCallback" data you entered (${findIndexCallback}) is not a function!`);
    if (length !== undefined && typeof length !== "number") throw new TypeError(`The "length" data you entered (${length}) is not a number!`);

    const allIndex = [];

    for (let i = 0; i < array.length; ++i) {
        // If the entered value and the searched value are the same, add the index value to the array
        if (findIndexCallback(array[i], i, this)) {
            allIndex.push(i);

            // Return array if "length" equals 1

            // Not 0 because we check first and then reduce
            // If we reduced first and then checked we would check if it equals 0
            if (length <= 1) return allIndex;
            length -= 1;
        }
    }

    return allIndex;
}



/**
 * Combines multiple arrays at once
 * @param {Array} array - Main array
 * @param  {...Array} arrays - Arrays to merge
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // Combine all arrays
 * const concatArray = ArrayUtil.concatAll([1, 2, 3, 4, 5], [6, 7, 8], [9, 10], [11, 12])
 * 
 * console.log(concatArray)
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 * @returns {Array}
 */

function concatAll(array, ...arrays) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);

    const result = [...array];
    for (const inputArray of arrays) {
        if (!Array.isArray(inputArray)) throw new TypeError(`The "array" data you entered has (${inputArray}) is not an Array!`);
        result.push(...inputArray);
    }
    return result;
}



/**
 * Allows simultaneous use of filter and map functions
 * @param {Array} array - Main array
 * @param {( value: any, index: Number, this: Array ) => Boolean} filterCallback - For filter function (Should return boolean)
 * @param {( value: any, index: Number, this: Array ) => any} mapCallback - For map function
 * @param {filterAndMapObject} param2 - Extra options
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's enter both our filter and map functions and return the values we want
 * const filterAndMapArray = array.filterAndMap(
 *    // This is main array
 *    array,
 *    
 *    // This is filter function
 *    value => value > 2,
 * 
 *    // This is map function
 *    value => value * 2,
 * 
 *    // These are optional variables
 *    { 
 *      length: 5, // Maximum length to Maximum length to rotate
 *      startIndex: 0 // Determines from which index value to start filtering
 *    }
 * )
 * 
 * console.log(filterAndMapArray)
 * // [6, 8, 10]
 * @returns {Array}
 */

function filterAndMap(array, filterCallback, mapCallback, { length, startIndex, thisArgs } = {}) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof filterCallback !== "function") throw new TypeError(`The "filterCallback" data you entered (${filterCallback}) is not a function!`);
    if (typeof mapCallback !== "function") throw new TypeError(`The "mapCallback" data you entered (${mapCallback}) is not a function!`);
    if (length !== undefined && typeof length !== "number") throw new TypeError(`The "length" data you entered (${length}) is not a number!`);
    if (startIndex !== undefined && typeof startIndex !== "number") throw new TypeError(`The "startIndex" data you entered (${startIndex}) is not a number!`);
    if (thisArgs !== undefined && !Array.isArray(thisArgs)) throw new TypeError(`The "thisArgs" data you entered (${thisArgs}) is not an Array!`);

    const arr = Array.isArray(thisArgs) ? thisArgs : array;
    const result = [];

    if (startIndex < 0) startIndex = 0;

    for (let index = startIndex; index < arr.length; ++index) {
        const val = arr[index];

        // Check if the value and push to the result array if it is true
        if (filterCallback.call(arr, val, index, this)) {
            result.push(mapCallback.call(arr, val, index, this));

            // If the length is 1 or less, return the result array
            if (length <= 1) return result;
            length -= 1;
        }
    }

    return result;
}



/**
 * Adds the entered value to the array sequentially
 * @param {Array} array - Main array
 * @param {any} value - Value to add to the array
 * @param {(array: Array, index: Number) => Number} operator - Function to determine the index value to add the entered value to the array (default is array[index] but you can change it to array[index].length or array[index].id or something else)
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 4, 5]
 * 
 * // Then we enter the value to add
 * ArrayUtil.pushWithSort(array, 3)
 * 
 * console.log(sortedArray)
 * // [1, 2, 3, 4, 5]
 * @returns {void}
 */

function pushWithSort(array, value, operator = (array, index) => array[index]) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof operator !== "function") throw new TypeError(`The "operator" data you entered (${operator}) is not a function!`);

    // If the entered value is not a number, return the array without changing anything
    if (!(1 in arguments)) return;

    const index = binarySearchFindIndex(array, value, operator);

    // If the index value is equal to -1, we add the entered value to the end of the array
    if (index === -1) {
        array.push(value);
        return;
    }

    // Using the splice function, we add the entered value to the index value we determined earlier
    array.splice(index, 0, value)
    return;

}


/**
 * Returns unique elements based on the result of a callback
 * @param {Array} array - Main array
 * @param {(value: any, index: Number, this: Array) => any} callback - Function to determine uniqueness (Should return boolean)
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const users = [{id: 1}, {id: 2}, {id: 1}];
 * const result = ArrayUtil.uniqueBy(users, u => u.id);
 * 
 * console.log(result); // [{id: 1}, {id: 2}]
 * @returns {Array}
 */
function uniqueBy(array, callback) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof callback !== "function") throw new TypeError(`The "callback" data you entered (${callback}) is not a function!`);

    const seen = new Set();
    return array.filter((item, index, arr) => {
        const key = callback(item, index, arr);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}


/**
 * Flattens nested arrays up to a given depth
 * @param {Array} array - Main array
 * @param {Number} depth - Flatten depth (default 1)
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * const arr = [1, [2, [3, 4]], 5];
 * const result = ArrayUtil.flatten(arr, 2);
 * 
 * console.log(result); // [1, 2, 3, 4, 5]
 * @returns {Array}
 */
function flatten(array, depth = 1) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof depth !== "number") throw new TypeError(`The "depth" data you entered (${depth}) is not a number!`);

    return depth > 0
        ? array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
        : array.slice();
}



/**
 * Swaps two values in the original array
 * @param {Array} array - Main array
 * @param {Number} index1 - Index value of the index to be changed
 * @param {Number} index2 - Index value of the index to be changed
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [4, 2, 3, 1, 5]
 * 
 * // And then let's replace index 0 with index 3
 * ArrayUtil.swap(array, 0, 4);
 * 
 * console.log(array)
 * // [1, 2, 3, 4, 5]
 * @returns {void}
 */

function swap(array, index1, index2) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof index1 !== "number") throw new TypeError(`The "index1" data you entered (${index1}) is not a number!`);
    if (typeof index2 !== "number") throw new TypeError(`The "index2" data you entered (${index2}) is not a number!`);
    if (index1 < 0 || index2 < 0) throw new RangeError(`The "index1" and "index2" data you entered (${index1}, ${index2}) cannot be less than 0!`);
    if (index1 >= array.length || index2 >= array.length) throw new RangeError(`The "index1" and "index2" data you entered (${index1}, ${index2}) cannot be greater than the length of the array!`);

    // Then we replace the values corresponding to those indexes.
    [array[index1], array[index2]] = [array[index2], array[index1]];
}



/**
 * Counts how many times the value you entered occurs in the array, if you entered a function instead of a value, it returns the number of values that provide the function
 * @param {Array} array - Main array
 * @param {any} value - Value to count in array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's see how many times 1 is in the series.
 * const countOne = ArrayUtil.count(array, 1)
 * 
 * console.log(countOne) // 1
 * 
 * // Now let's see how many numbers greater than 3 are in the array
 * const greaterThan3 = ArrayUtil.count(array, (number, index, thisArray) => number > 3)
 * 
 * console.log(greaterThan3) // 2
 * @returns {Number}
 */

function count(array, value) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);

    // Return 0 if no value parameter is entered
    if (!(1 in arguments)) return 0;

    let total = 0;

    // Use loop if the entered value is a function
    if (typeof value === "function") {
        for (let i = 0; i < array.length; ++i) {
            if (value(array[i], i, this)) total += 1;
        }
    }

    // Use loop if the entered value is not a function
    else {
        for (let i = 0; i < array.length; ++i) {
            if (sameValue(array[i], value)) total += 1;
        }
    }

    return total;
}



/**
 * Randomly shuffles elements in an array
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's randomly shuffle the elements in the array
 * const shuffle1 = ArrayUtil.shuffle(array)
 * console.log(shuffle1) // [4, 2, 5, 3, 1]
 * 
 * const shuffle2 = ArrayUtil.shuffle(array)
 * console.log(shuffle2) // [3, 1, 4, 2, 5]
 * @returns {Array}
 */

function shuffle(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    const copyArray = [...array];
    return Array.from({ length: array.length }, () => {
        return copyArray.splice(Number(Math.random() * copyArray.length), 1)[0]
    })

}



/**
 * Returns the different values between the array you entered and the original array
 * @param {Array} array - Main array
 * @param {Array} inputArray - Array to check
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's create a new series and find the differences between them
 * const otherArray = [3, 4, 5, 6, 7]
 * 
 * // Then print the differences between them to the console using the difference method
 * const difference = ArrayUtil.difference(array, otherArray)
 * 
 * console.log(difference)
 * // [1, 2, 6, 7]
 * @returns 
 */

function difference(array, otherArray) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (!Array.isArray(otherArray)) throw new TypeError(`The "otherArray" data you entered (${otherArray}) is not an Array!`);

    // Removes duplicate data from arrays to save memory and performance
    const removedArray = removeDuplicate(array);
    const otherRemovedArray = removeDuplicate(otherArray);

    const ban = new Set();
    const concatedArray = [...removedArray, ...otherRemovedArray];
    const result = [];

    function hasResult(value) {
        for (const val of result) {
            if (sameValue(val, value)) return true;
        }
        return false;
    }

    for (const input of concatedArray) {
        // Continue saving if input value is in ban array
        if (ban.has(input)) continue;

        if (hasResult(input)) {
            // If the input value is already in the result array, add it to the ban array
            ban.add(input);
            continue;
        }

        // If the input value is not in the result array, add it to the result array
        result.push(input);
    }

    return result.filter(value => !ban.has(value));
}



/**
 * Removes duplicated data in arrays
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 1, 2, 3]
 * 
 * // Then let's remove the copied data and print it to the console
 * const removeDuplicate = ArrayUtil.removeDuplicate(array)
 * 
 * console.log(removeDuplicate)
 * // [1, 2, 3, 4, 5]
 * @returns {Array}
 */

function removeDuplicate(array,) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`)
    return [...new Set(array)];
}



/**
 * Reruns the array by splitting it into chunks
 * @param {Array} array - Main array
 * @param {Number} length - Length of chunks
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * // Then we determine the length of the chunks and print them to the console
 * const chunk = ArrayUtil.chunk(array, 2)
 * 
 * console.log(chunk)
 * // [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * @returns {Array<Array>}
 */

function chunk(array, length) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (length !== undefined && typeof length !== "number") throw new TypeError(`The "length" data you entered (${length}) is not a number!`);
    if (length < 0) throw new RangeError(`The "length" data you entered (${length}) cannot be less than 0!`);

    return Array.from(
        { length: Math.ceil(array.length / length) },
        (_, index) => array.slice(index * length, (index + 1) * length)
    );
}


/**
 * Groups the array by the function you entered
 * @param {Array} array - Main array
 * @param {(value: any, index: Number, this: Array) => any} callback - Function to group the array by
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 6];
 * 
 * // Then we group the array by odd and even numbers and print it to the console
 * const groupedArray = ArrayUtil.groupBy(array, (value) => value % 2 === 0 ? "even" : "odd");
 * 
 * console.log(groupedArray); // { odd: [1, 3, 5], even: [2, 4, 6] }
 * @returns {Object}
 */
function groupBy(array, callback) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (typeof callback !== "function") throw new TypeError(`The "callback" data you entered (${callback}) is not a function!`);

    const result = {};

    for (let i = 0; i < array.length; ++i) {
        const value = array[i];
        const key = callback(value, i, this);
        if (!result[key]) result[key] = [];
        result[key].push(value);
    }

    return result;
}



/**
 * Converts an array to an object
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = ["Hello", "World", "!"]
 * 
 * // Then we convert this array to object and print it to console
 * const object = ArrayUtil.toObject(array)
 * 
 * console.log(object)
 * // { 0: "Hello", 1: "World", 2: "!" }
 * @returns {Object}
 */

function toObject(array,) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`)
    return Object.fromEntries(array.entries());
}



/**
 * Converts an array to a Set function
 * @param {Array} array - Main array
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = ["Hello", "World", "!"]
 * 
 * // Then we convert this array to Set function and print it to console
 * const set = ArrayUtil.toSet(array)
 * 
 * console.log(set)
 * // Set(3) { 'Hello', 'World', '!' }
 * @returns {Set}
 */

function toSet(array) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`)
    return new Set(array);
}



/**
 * Returns an array of the same values in the original array as the array you entered
 * @param {Array} array - Main array
 * @param {Array} otherArray - Array to check
 * @example
 * const ArrayUtil = require("alisa.array");
 * 
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // So let's create a new series and find the similarities between them.
 * const otherArray = [3, 4, 5, 6, 7]
 * 
 * // Then print the similarities between them to the console using the similar method.
 * const similar = ArrayUtil.similar(array, otherArray)
 * 
 * console.log(similar)
 * // [3, 4, 5]
 * @returns {Array}
 */


function similar(array, otherArray) {
    if (!Array.isArray(array)) throw new TypeError(`The "array" data you entered (${array}) is not an Array!`);
    if (!Array.isArray(otherArray)) throw new TypeError(`The "otherArray" data you entered (${otherArray}) is not an Array!`);

    // This allows faster checking of data by converting the array to a set object.
    const arrayToSet = toSet(array);
    const otherArrayToSet = toSet(otherArray);

    // Then we'll do the for loop as long as the shorter one of the arrays
    let smallestSet, longestSet;
    if (arrayToSet.size > otherArrayToSet.size) {
        smallestSet = otherArrayToSet;
        longestSet = arrayToSet;
    } else {
        smallestSet = arrayToSet;
        longestSet = otherArrayToSet;
    }

    const returnArray = [];

    for (const value of smallestSet) {
        if (longestSet.has(value)) returnArray.push(value);
    }

    return returnArray;
}

module.exports = {
    sameArray,
    permutations,
    onlyEvens,
    onlyOdds,
    reversed,
    max,
    min,
    allIndexOf,
    findIndexAll,
    concatAll,
    filterAndMap,
    pushWithSort,
    uniqueBy,
    flatten,
    swap,
    shuffle,
    count,
    difference,
    removeDuplicate,
    chunk,
    groupBy,
    toObject,
    toSet,
    similar
}