const helper = require('./helper.js');
test('Check random generated numbers in range and unique', () => {
    let result = helper.getRandomUniqueNumber(20, 100, 33);
    for (var i = 0; i < result.length; i++) {
        expect(result.indexOf(result[i]) != i).toBe(false);
        expect(result[i] > 133).toBe(false);
        expect(result[i] < 33).toBe(false);
    }
});