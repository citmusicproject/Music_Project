var search = require('youtube-search');
var keyWord = '';
// var secret = require('./keys');
var fs = require('fs');
var list = [];
var alert = require('alert-node');

const request = require('request');

// var password = secret.key;
var opts = {
    maxResults: 10,
    // videoCategoryId: 10,
    key: 'AIzaSyA-HLMdUs5ve4uldOOTcfT7BtfWELHfJL8',
    type: "video",
    videoCategoryId: "10"
    // chart: "mostPopular"
};



// fs.readFile('keys', (er, da) => {
//     password = da.toString().substring(1);
//     opts = {
//         maxResults: 5,
//         key: password
//     }
// });


function gpassword() {
    return password
}

function searchYoutube(keyword, callback) {
    var song = `${keyword} VEVO`
    search(song, opts, function(err, results) {
        var i = 0;
        var links = [];
        var img = [];
        var title = [];
        var error = false;
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
            links.push(results[i].id);
            img.push(results[i].thumbnails.high.url);
            title.push(results[i].title);
        }
        if (img.length == 0 && links.length == 0 && title.length == 0) {
            // links.push("(unknown)");
            // img.push("https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png");
            // title.push("Sorry, No Search Results");
            // alert('Sorry, No Search Results')
            error = true
        }
        callback(undefined, {
            links: links,
            img: img,
            title: title,
            error: error
        });
    });
};


<<<<<<< HEAD
function checkSearchInput(keyword) {
    var song = keyword;
    searchYoutube(song, (errorMessage, results) => {
        if (results.links.length == 0) {
            return false;
        }else {
            return true;
        }
    })
}






function readJSON() {
    fs.readFile('test.JSON', test);
    var test = JSON.parse(test);
}

module.exports = {
    searchYoutube,
    gpassword,
    checkSearchInput
    // youtubesearch
};
