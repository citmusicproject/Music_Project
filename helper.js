// Simple implement of random unique number.
// Performance issue when amount is close to max.
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