var search = require('youtube-search'); // easy way use to search youtube
var secret = require('./keys');//get api key from json file
var fs = require('fs');
var alert = require('alert-node'); //creates an alert for website
const request = require('request');

// api key from keys.json
var password = secret.key;

// parameters for youtube search
var opts = {
    // maxResults: 10,
    key: password,
    type: "video",
    videoCategoryId: "10",
    chart: "mostPopular"
};

// This function return api key for youtube api
function gpassword() {
    return password;
}

//This function used to search song from youtube and return links,img,title, and possible errors
function searchYoutube(keyword, callback) {
    var song = `${keyword} VEVO`;
    search(song, opts, function(err, results) {
        var i = 0;
        var links = [];
        var img = [];
        var title = [];
        var error = false;
        var lessthanfiveerror = false;
        for (var i = 0; i < results.length; i++) {
            links.push(results[i].id);
            img.push(results[i].thumbnails.high.url);
            title.push(results[i].title);
        }
        if (img.length == 0 && links.length == 0 && title.length == 0) {
            error = true;
        }
        else if (img.length <= 5 && links.length <= 5 && title.length <= 5){
            lessthanfiveerror = true;
        }
        callback(undefined, {
            links: links,
            img: img,
            title: title,
            error: error,
            lessthanfiveerror: lessthanfiveerror
        });
    });
};

//exporting functions
module.exports = {
    searchYoutube,
    gpassword
};
