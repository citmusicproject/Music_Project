// Simple implement of random unique number.
// Performance issue when amount is close to max.
/**
* Simple implement of random unique number.
* Performance issue when amount is close to max.
* Require Data: amount, max, offset
* @param {integer} amount - Starting integer number
* @param {integer} max - Ending integer number
* @param {integer} offset - Offset integer number
*/
function getRandomUniqueNumber(amount, max, offset) {
    var arr = [];
    while (arr.length < amount) {
        var randomnumber = Math.floor(Math.random() * max) + offset;
        if (arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
}
// Exporting Functions
module.exports = {
    getRandomUniqueNumber
};