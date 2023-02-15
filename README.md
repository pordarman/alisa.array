## [![Alisa Logo](https://i.hizliresim.com/aug2sp9.png)](https://www.npmjs.com/package/alisa.array/)


[![Package Name](https://img.shields.io/badge/Package%20name-alisa.array-red)](https://www.npmjs.com/package/alisa.array/)
[![Package size](https://img.shields.io/bundlephobia/min/alisa.array?label=Package%20size)](https://www.npmjs.com/package/alisa.array/)
[![Version](https://img.shields.io/npm/v/alisa.array.svg?label=Package%20version)](https://www.npmjs.com/package/alisa.array/)
[![License](https://img.shields.io/npm/l/alisa.array.svg?label=License)](https://www.npmjs.com/package/alisa.array/)

[![NPM](https://nodei.co/npm/alisa.array.png?downloads=true)](https://www.npmjs.com/package/alisa.array/)

# Source file

- [alisa.array](https://github.com/pordarman/alisa.array)

<br>

# Creator(s)

- [Ali (Fearless Crazy)](https://github.com/pordarman)

<br>

# Social media accounts

- Ali: [Instagram](https://www.instagram.com/ali.celk/) - [Discord](https://discord.com/users/488839097537003521) - [Spotify](https://open.spotify.com/user/215jixxk4morzgq5mpzsmwwqa?si=41e0583b36f9449b)

<br>

# How is it used and what are its features?

- Let's first look at how to use:

```js
// If you created a regular JavaScript file (without Node.js)
// You can use it like this

import _ from "alisa.array"
// You can give any name you want here, we will not use it anyway

// But if you have created Node.js file, you should use it like this
require("alisa.array")


// After doing this, you can now access all the features. For example:
const array = [1, 2, 3, 4, 5];

const filterAndMap = array.filterAndMap(
    // First we filter which numbers to get
    (number) => number >= 3,

    // Then we determine what to do with these numbers
    (number) => number * number
)

// If we print this to the console it will look something like this:
console.log(filterAndMap);
// [9, 16, 25]
```

- If your code compiler says something like **"No such function"** after typing "filterAndMap" or something else, ignore it, if you have imported the module correctly it will work.

<br>
<hr>
<br>

- The module has many more features like this. Below are the features added thanks to this module, what they all do and an example for each. **If you think you don't need it, you can skip here.**

## `Here are all the features:`

- **`sameArray()`** => Checks if the array entered in the function is the same as the array.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.sameArray([1, 2, 3])) // false;
console.log(array.sameArray([1, 2, 3, 4, 5])) // true
```

<br>

- **`allIndexOf()`** => Returns all index values that satisfy the value you entered.
```js
const array = [1, 2, 3, 4, 5, 1, 2];

console.log(array.allIndexOf(1)) // [0, 5];
console.log(array.allIndexOf(6)) // -1
```

<br>

- **`findIndexAll()`** => Returns all index values that satisfy the function you entered.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.findIndexAll(number => number > 2)) // [2, 3, 4];
console.log(array.findIndexAll(number => number < 0)) // -1
```

<br>

- **`concatAll()`** => Returns a new array by concatenating all the strings you entered in it.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.concatAll([6, 7], [8, 9, 10]))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

<br>

- **`filterAndMap()`** => Saves time and memory by performing both filtering and mapping at the same time.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.filterAndMap(
    (number) => number <= 2,
    (number) => number + number
))
// [2, 4]
```

<br>

- **`pushWithSort()`** => Adds the value you entered sequentially into the array.
```js
const array = [1, 2, 4, 5];

array.pushWithSort(3);

console.log(array)
// [1, 2, 3, 4, 5]
```

<br>

- **`swap()`** => Swaps two values in array. The entered values are index values.
```js
const array = [4, 2, 3, 1, 5];

array.swap(0, 3);

console.log(array)
// [1, 2, 3, 4, 5]
```

<br>

- **`count()`** => Counts how many times the value you entered occurs in the array. **If you entered a function, the function returns the number of appropriate numbers.**
```js
const array = [1, 2, 3, 4, 5];

console.log(array.count(1)) // 1

console.log(array.count(
    (number, index, thisArray) => {
      return number >= 3
    })
) // 3
```

<br>

- **`shuffle()`** => Randomly shuffles elements in an array.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.shuffle())
// [5, 3, 4, 1, 2]

console.log(array.shuffle())
// [2, 5, 3, 4, 1]
```

<br>

- **`similar()`** => Returns a string of similarities between the string you entered and the original string.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.similar([3, 4, 5, 6, 7]))
// [3, 4, 5]
```

<br>

- **`removeDuplicate()`** => Removes all duplicate values in the array.
```js
const array = [1, 2, 3, 4, 5, 1, 5, 4, 3, 2];

console.log(array.removeDuplicate())
// [1, 2, 3, 4, 5]
```

<br>

- **`group()`** => Groups the array so that the value in the array is the length of the group where you enter the values.
```js
const array = [1, 2, 3, 4, 5, 6];

console.log(array.group(2))
// [[1, 2], [3, 4], [5, 6]]
```

<br>

- **`toObject()`** => Converts the array to an object.
```js
const array = [1, 2, 3, 4, 5];

console.log(array.toObject())
// { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }
```

<br>

- **`toSet()`** => Converts the array to a Set Function.
```js
const array = [1, 2, 3, 4, 5, 1, 5, 4, 3, 2];

console.log(array.toSet())
// Set(5) { 1, 2, 3, 4, 5 }
```

<br>

# Updates

## v0.0.2

- Added `.shuffle()`, `.swap()` and `.count()` functions.

## v0.0.1

- Module shared publicly 🥳🥳

<br>

Please do not forget to use it in the latest version for more **stable** and **performance** of the module!

<br>

# For those who read this far...

- First of all, **thank you so much** for reading this far <3

- **Since my English is not very good**, I may have made a language mistake in some places, sorry for that, **I'm trying to learn more**. I hope you can understand what I wrote.

- If there are mistakes in my module or where you want me to improve, please let me know.


<br>

# And finally

- If you want to support this module, if you request me on [github](https://github.com/pordarman), I will be happy to help you.

- Thank you for reading this far, i love you 💗

- See you in my next modules!

<br>

![lovee](https://gifdb.com/images/high/drake-heart-hands-aqm0moab2i6ocb44.webp)