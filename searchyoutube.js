var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];

const request = require('request');

var password = secret.key;
var opts = {
    maxResults: 10,
    // videoCategoryId: 10,
    key: password,
    type: "video",
    videoCategoryId: "10",
    chart: "mostPopular"
};



// fs.readFile('keys', (er, da) => {
//     password = da.toString().substring(1);
//     opts = {
//         maxResults: 5,
//         key: password
//     }
// });


function gpassword() {
    return password;
}

function searchYoutube(keyword, callback) {
    var song = keyword+' song'
    search(song, opts, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            var i = 0;
            var links = [];
            var img = [];
            var title = [];
            // console.log(results);
            for (var i = 0; i < results.length; i++) {
                links.push(results[i].id);
                img.push(results[i].thumbnails.high.url);
                title.push(results[i].title);
            }
            callback(undefined, {
                links: links,
                img: img,
                title: title

            });
        };
    });
};


function readJSON() {
    fs.readFile('test.JSON', test);
    var test = JSON.parse(test);
}

module.exports = {
    readJSON,
    searchYoutube,
    gpassword
    // youtubesearch
};