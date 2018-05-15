var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];
var alert = require('alert-node');

const request = require('request');

var password = secret.key;
var opts = {
    maxResults: 10,
    key: password,
    type: "video",
    videoCategoryId: "10",
    chart: "mostPopular"
};



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


module.exports = {
    searchYoutube,
    gpassword
};
