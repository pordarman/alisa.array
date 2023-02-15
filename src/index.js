/**
 * Filter And Map Function's Object arguments
 * @typedef filterAndMapObject
 * @property {Number} [size=Infinity] - Number of data to return
 * @property {Number} [startIndex=0] - Determines the index value to start with
 * @property {Array} thisArgs - The object to be used as the current object
 */





/**
 * Checks if the entered objects are the same
 * @param {Object} object1 
 * @param {Object} object2 
 * @returns {Boolean}
 */

function sameObject(object1, object2) {
    let objectEnt1 = Object.entries(object1)
    let objectEnt2 = Object.entries(object2)
    if (objectEnt1.length != objectEnt2.length) return false
    for (const [key, value_1] of objectEnt1) {
        let obj = objectEnt2.find(a => a[0] === key)
        if (!obj || !sameValue(value_1, obj[1])) return false
    }
    return true
}

/**
 * Checks if the entered values are the same
 * @param {*} value1 
 * @param {*} value2 
 * @returns {Boolean}
 */

function sameValue(value1, value2) {
    try {
        if (value1 === value2) return true;
        let pro1 = Object.prototype.toString.call(value1)
        let pro2 = Object.prototype.toString.call(value2)
        if (pro1 !== pro2) return false
        switch (pro1) {
            case "[object String]":
            case "[object Number]":
            case "[object Boolean]": {
                return value1 === value2
            }
            case "[object Array]": {
                return sameArray(value1, value2)
            }
            case "[object Date]": {
                return value1.getTime() === value2.getTime()
            }
            case "[object Object]": {
                return sameObject(value1, value2)
            }
        }
        if (value1 instanceof Set && value2 instanceof Set) return sameArray([...value1], [...value2])
        if (value1 instanceof Map && value2 instanceof Map) return sameArray([...value1.entries()], [...value2.entries()])
        if (value1 instanceof RegExp && value2 instanceof RegExp) return (value1.source === value2.source) && (value1.flags === value2.flags)
        if (value1?.prototype !== undefined) return value1?.prototype === value2?.prototype
        if (value1?.name !== undefined) return value1?.name === value2?.name
    } catch (e) { }
    return false
}

/**
 * Checks if the entered Arrays are the same
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {Boolean}
 */

function sameArray(array1, array2) {
    let length = array1.length;
    if (length != array2.length) return false
    for (let index = 0; index < length; ++index) {
        if (!sameValue(array1[index], array2[index])) return false;
    }
    return true;
}



/**
 * Checks if the entered arrays are the same array
 * @param {Array} inputArray - Array to check
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's create a new array and check if it's the same array
 * const array1 = [1, 2, 3, 4, 5]
 * 
 * if (array.sameArray(array1)) {
 *   console.log("Both arrays are the same!")
 * } else {
 *   console.log("No two arrays are the same :(")
 * }
 * @returns {Boolean}
 */

Array.prototype.sameArray = function (inputArray) {

    // Return false if the entered value is not an array
    if (!Array.isArray(inputArray)) return false;

    // Check if the entered values are the same
    return sameArray(this, inputArray)

}



/**
 * Returns index values by searching the entered value in the array
 * @param {any} searchValue - Value to search
 * @param {Number} [length=Infinity] - Maximum length of array to return
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 1]
 * 
 * // Then let's enter the value to look for
 * const indexs = array.allIndexOf(1)
 * 
 * console.log(index)
 * // [0, 5]
 * 
 * 
 * const indexs1 = array.allIndexOf(6)
 * 
 * console.log(indexs1)
 * // -1
 * @returns {Array<Number>|Number} - Returns -1 if no value was found, an array if found
 */

Array.prototype.allIndexOf = function (searchValue, length) {

    // Converts the entered value to a number
    length = Math.floor(length);

    // Array to store index values
    const allIndex = [];

    // If length is not specified use this loop
    if (isNaN(length)) {

        for (const index in this) {

            // If the entered value and the searched value are the same, add the index value to the array
            if (sameValue(this[index], searchValue)) allIndex.push(+index)

        }

    }

    // Use this loop if maximum length of array is specified
    else {
        for (const index in this) {

            // If the entered value and the searched value are the same, add the index value to the array
            if (sameValue(this[index], searchValue)) {

                allIndex.push(+index);

                // Return array if "length" equals 1

                // Not 0 because we check first and then reduce
                // If we reduced first and then checked we would check if it equals 0
                if (length === 1) return allIndex;
                length -= 1;
            }

        }
    }

    // Return -1 if no value is found
    return allIndex.length === 0 ? -1 : allIndex

}




/**
 * Returns the index of values that match the function.
 * @param {( value: any, index: Number, this: Array ) => Boolean} findIndexCallback - For filter function (Should return boolean)
 * @param {Number} [length=Infinity] - Maximum length of array to return
 * @example
 * // First let's create an array
 * const array = ["Hello", "World", "Hi", "!"]
 * 
 * // And by entering a function, let's return the index values of the values we want.
 * const indexs = array.findIndexAll(value => value.startsWith("H"))
 * 
 * console.log(indexs)
 * // [0, 1]
 * @returns {Array<Number>|Number} - Returns -1 if no value was found, an array if found
 */

Array.prototype.findIndexAll = function (findIndexCallback, length) {

    // If the entered value are not a function, throw a TypeError
    if (typeof findIndexCallback !== "function") throw new TypeError(`${findIndexCallback} is not a function`)

    // Converts the entered value to a number
    length = Math.floor(length);

    // Array to store index values
    const allIndex = [];

    // If length is not specified use this loop
    if (isNaN(length)) {

        for (const index in this) {

            // If the entered value and the searched value are the same, add the index value to the array
            if (findIndexCallback(this[index], index, this)) allIndex.push(+index)

        }

    }

    // Use this loop if maximum length of array is specified
    else {
        for (const index in this) {

            // If the entered value and the searched value are the same, add the index value to the array
            if (findIndexCallback(this[index], index, this)) {

                allIndex.push(+index);

                // Return array if "length" equals 1

                // Not 0 because we check first and then reduce
                // If we reduced first and then checked we would check if it equals 0
                if (length === 1) return allIndex;
                length -= 1;
            }

        }
    }

    // Return -1 if no value is found
    return allIndex.length === 0 ? -1 : allIndex

}



/**
 * Combines multiple arrays at once
 * @param  {...any} arrays - Arrays to merge
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's combine this with other arrays
 * const concatArray = array.concatAll([6, 7, 8], [9, 10], [11, 12])
 * 
 * console.log(concatArray)
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * @returns {Array}
 */

Array.prototype.concatAll = function (...arrays) {
    return [...this, ...arrays.flat()]
}



/**
 * Allows simultaneous use of filter and map functions
 * @param {( value: any, index: Number, this: Array ) => Boolean} filterCallback - For filter function (Should return boolean)
 * @param {( value: any, index: Number, this: Array ) => any} mapCallback - For map function
 * @param {filterAndMapObject} param2 - Extra options
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's enter both our filter and map functions and return the values we want
 * const filterAndMapArray = array.filterAndMap(
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

Array.prototype.filterAndMap = function (filterCallback, mapCallback, { length, startIndex, thisArgs } = {}) {

    // If the entered values are not a function, throw a TypeError
    if (typeof filterCallback !== "function") throw new TypeError(`${filterCallback} is not a function`)
    if (typeof mapCallback !== "function") throw new TypeError(`${mapCallback} is not a function`)

    // If thisArgs expression is entered, make thisArgs the default array
    let forArray = Array.isArray(thisArgs) ? thisArgs : this,

        // Array to return at the end
        returnArray = [],

        // Save memory and performance by caching the length of the array
        arrayLength = forArray.length,
        startIndexForLoop = Math.floor(startIndex) || 0;

    // Equal to 0 if a negative value is entered (in terms of performance)
    if (startIndexForLoop < 0) startIndexForLoop = 0

    // Converts the entered value to a number
    length = Math.floor(length)

    // Use this function if the array is not constrained
    if (isNaN(length)) {
        for (let index = startIndexForLoop; index < arrayLength; ++index) {
            let val = forArray[index];

            // If this value passes through the filter function, add the desired value to the array using the map function
            if (filterCallback(val, index, forArray)) returnArray.push(mapCallback(val, index, forArray));

        }
    }

    // Use this function if the array is constrained
    else {
        for (let index = startIndexForLoop; index < arrayLength; ++index) {
            let val = forArray[index];

            // If this value passes through the filter function
            // Add the desired value to the array using the map function
            // And decrease "length" by 1
            if (filterCallback(val, index, forArray)) {

                returnArray.push(mapCallback(val, index, forArray));

                // Return array if "length" equals 1

                // Not 0 because we check first and then reduce
                // If we reduced first and then checked we would check if it equals 0
                if (length === 1) return returnArray;
                length -= 1;
            }
        }
    }
    return returnArray;
}



/**
 * Adds the entered value to the array sequentially
 * @param {Number|String} value - Value to add to the array (It is recommended that the value be a string or number)
 * @example
 * // First let's create an array
 * const array = [1, 2, 4, 5]
 * 
 * // Then we enter the value to add
 * const sortedArray = array.pushWithSort(3)
 * 
 * console.log(sortedArray)
 * // [1, 2, 3, 4, 5]
 * @returns {Array}
 */

Array.prototype.pushWithSort = function (value) {

    // Return array if no value is entered
    if (!(0 in arguments)) return this;

    // We find which index value to put the entered value in the array
    let index = this.findIndex(arrayValue => arrayValue > value);

    // If the index value is equal to -1, we add the entered value to the end of the array
    if (index === -1) {
        this.push(value);
        return this;
    }

    // Using the splice function, we add the entered value to the index value we determined earlier
    this.splice(index, 0, value)
    return this;

}



/**
 * Swaps two values in the original array
 * @param {Number} index1 - Index value of the index to be changed
 * @param {Number} index2 - Index value of the index to be changed
 * @example
 * // First let's create an array
 * const array = [4, 2, 3, 1, 5]
 * 
 * // And then let's replace index 0 with index 3
 * array.swap(0, 4);
 * 
 * console.log(array)
 * // [1, 2, 3, 4, 5]
 * @returns {Array}
 */

Array.prototype.swap = function (index1, index2) {

    // Converts the entered value to a number
    index1 = Math.floor(index1);
    index2 = Math.floor(index2);

    // If at least one of the entered values is not a number, return the array without changing anything
    if (isNaN(index1) || isNaN(index2)) return this;

    // Then we replace the values corresponding to those indexes.
    [this[index1], this[index2]] = [this[index2], this[index1]];

    return this;

}



/**
 * Counts how many times the value you entered occurs in the array, if you entered a function instead of a value, it returns the number of values that provide the function
 * @param {any} value - Value to count in array
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's see how many times 1 is in the series.
 * const countOne = array.count(1)
 * 
 * console.log(countOne) // 1
 * 
 * // Now let's see how many numbers greater than 3 are in the array
 * const greaterThan3 = array.count((number, index, thisArray) => number > 3)
 * 
 * console.log(greaterThan3) // 2
 * @returns {Number}
 */

Array.prototype.count = function (value) {

    // Return 0 if no value parameter is entered
    if (!(0 in arguments)) return 0;

    let total = 0;

    // Use this loop if the entered value is a function
    if (typeof value === "function") {

        for (const index in this) {
            if (value(this[index], index, this)) total += 1;
        }

    }

    // Use this loop if the entered value is not a function
    else {

        for (const inputArray of this) {
            if (sameValue(inputArray, value)) total += 1;
        }

    }

    return total;

}



/**
 * Randomly shuffles elements in an array
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's randomly shuffle the elements in the array
 * const shuffle1 = array.shuffle()
 * 
 * console.log(shuffle1) // [4, 2, 5, 3, 1]
 * 
 * const shuffle2 = array.shuffle()
 * 
 * console.log(shuffle2) // [3, 1, 4, 2, 5]
 * @returns {Array}
 */

Array.prototype.shuffle = function () {

    // To make the code more optimised, we first save the length of the array
    let length = this.length;

    // And we save a copy of the array
    let copyArray = [...this];

    // Then we randomly shuffle the array using the Array.from function
    return Array.from({ length }, () => {
        return copyArray.splice(Math.floor(Math.random() * length--), 1)[0]
    })

}



/**
 * Returns the different values between the array you entered and the original array
 * @param {Array} inputArray - Array to check
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // Then let's create a new series and find the differences between them
 * const otherArray = [3, 4, 5, 6, 7]
 * 
 * // Then print the differences between them to the console using the difference method
 * const difference = array.difference(otherArray)
 * 
 * console.log(difference)
 * // [1, 2, 6, 7]
 * @returns 
 */

Array.prototype.difference = function (inputArray) {

    // Return the array itself if no array is entered
    if (!Array.isArray(inputArray)) return this;

    // Removes duplicate data from arrays to save memory and performance
    let thisArray = [...new Set(this)];
    inputArray = [...new Set(inputArray)]

    // First I create an empty object and save the values in the arrays to the object
    // But when the same value comes for the 2nd time, we will save it to the "ban" array we created before, since we will no longer save it
    // Thus, we save memory because it will pass without saving the values inside the ban value
    let obj = { ban: new Set() },

        // Then we concatenate the two arrays and start the for loop
        forArray = [...thisArray, ...inputArray];

    for (const input of forArray) {

        // Continue saving if input value is in ban array
        if (obj.ban.has(input)) continue;

        // If we have saved the input value before, delete that input value from the object and add the input value to the ban array
        if (obj[input]) {
            delete obj[input];
            obj.ban.add(input);
            continue;
        }

        // Save input value to object
        obj[input] = true;

    }

    // Finally, delete the "ban" value from the object and return the object's key data
    delete obj.ban

    return Object.keys(obj)

}



/**
 * Removes duplicated data in arrays
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 1, 2, 3]
 * 
 * // Then let's remove the copied data and print it to the console
 * const removeDuplicate = array.removeDuplicate()
 * 
 * console.log(removeDuplicate)
 * // [1, 2, 3, 4, 5]
 * @returns {Array}
 */

Array.prototype.removeDuplicate = function () {

    // Actually there are many ways to remove duplicates in arrays but we will use the fastest
    return [...new Set(this)];

    /**
     * But other ways are:
     * 
     * => this.filter((value, index) => this.indexOf(value) === index)
     * // This is almost the slowest and not recommended
     * 
     * => let array = [];
     * for (const value of this) {
     *   if (!array.includes(value)) array.push(value) 
     * }
     * return array
     * // This is faster than the previous one but it is the fastest one among the ones we are using now
     */

}



/**
 * Reruns the array by splitting it into groups
 * @param {Number} length - Length of groups
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * // Then we determine the length of the groups and print them to the console
 * const group = array.group(2)
 * 
 * console.log(group)
 * // [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * @returns {Array<Array>}
 */

Array.prototype.group = function (length) {

    // Converts the entered value to a number
    length = Math.floor(length);

    // Return only 1 group if the entered value is not a number or less than or equal to 0
    if (isNaN(length) || length <= 0) return [this];

    // Then we divide into groups using the Array.from method
    return Array.from(
        {
            length: Math.ceil(this.length / length) // We determine the length of the array
        },
        (_, index) => {

            // Then we divide it into groups using the slice method
            return this.slice(index * length, (index + 1) * length);
        }
    )
}



/**
 * Converts an array to an object
 * @example
 * // First let's create an array
 * const array = ["Hello", "World", "!"]
 * 
 * // Then we convert this array to object and print it to console
 * const object = array.toObject()
 * 
 * console.log(object)
 * // { 0: "Hello", 1: "World", 2: "!" }
 * @returns {Object}
 */

Array.prototype.toObject = function () {

    // Here we return an array to an object using the Object.fromEntries method
    return Object.fromEntries(this.entries())

}



/**
 * Converts an array to a Set function
 * @example
 * // First let's create an array
 * const array = ["Hello", "World", "!"]
 * 
 * // Then we convert this array to Set function and print it to console
 * const set = array.toSet()
 * 
 * console.log(set)
 * // Set(3) { 'Hello', 'World', '!' }
 * @returns {Set}
 */

Array.prototype.toSet = function () {

    // Here we return an array to a Set function using the new Set() method
    return new Set(this)

}



/**
 * Returns an array of the same values in the original array as the array you entered
 * @param {Array} inputArray - Array to check
 * @example
 * // First let's create an array
 * const array = [1, 2, 3, 4, 5]
 * 
 * // So let's create a new series and find the similarities between them.
 * const otherArray = [3, 4, 5, 6, 7]
 * 
 * // Then print the similarities between them to the console using the similar method.
 * const similar = array.similar(otherArray)
 * 
 * console.log(similar)
 * // [3, 4, 5]
 * @returns {Array}
 */


Array.prototype.similar = function (inputArray) {

    // Return an empty array if the entered value is not an array
    if (!Array.isArray(inputArray)) return [];

    // Made for the next code to be more optimized

    // This allows faster checking of data by converting the array to a set object.
    let thisArray = new Set(this);
    inputArray = new Set(inputArray);

    // Then we'll do the for loop as long as the shorter one of the arrays
    let smallestArray, longestArray;

    if (thisArray.size > inputArray.size) {
        smallestArray = inputArray;
        longestArray = thisArray;
    } else {
        smallestArray = thisArray;
        longestArray = inputArray;
    }

    const returnArray = [];

    // And we start our for loop
    for (const value of smallestArray) {

        // Add value to array if value exists in other array
        if (longestArray.has(value)) returnArray.push(value)

    }

    return returnArray

}
