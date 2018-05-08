const su2b = require("./searchyoutube");
// https://facebook.github.io/jest/docs/en/asynchronous.html
// Use done argument to test callback.
test('Test if result is empty', done => {
    function callback(something, data) {
        expect(data).not.toBeNull();
        expect(data).toBeDefined();
        done();
    }
    su2b.searchYoutube("keyword", callback);
});