const su2b = require("./searchyoutube");
var secret = require('./keys');
var password = secret.key;
// https://facebook.github.io/jest/docs/en/asynchronous.html
// Use done argument to test callback.
test('Test if result is not null', done => {
    function callback(something, data) {
        expect(data).not.toBeNull();
        expect(data).toBeDefined();
        done();
    }
    su2b.searchYoutube("keyword", callback);
});

test('Test if result is empty', done => {
    function callback(something, data) {
        expect(data.img).toEqual([]);
        expect(data.links).toEqual([]);
        expect(data.title).toEqual([]);
        done();
    }
    su2b.searchYoutube("Dffldsh", callback);
});

test('Test if result contain 10 link/title/img', done => {
    function callback(something, data) {
        expect(data.img.length).toBe(10);
        expect(data.links.length).toBe(10);
        expect(data.title.length).toBe(10);
        done();
    }
    su2b.searchYoutube("Drake", callback);
});

test("Test if key is avaliable", done =>{
        expect(su2b.gpassword()).toBe(password); 
        done();
    });

