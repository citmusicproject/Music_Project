var search = require('youtube-search'); // easy way use to search youtube
// var secret = require('./keys');//get api key from json file
var fs = require('fs');
var alert = require('alert-node'); //creates an alert for website
const request = require('request');
require('dotenv').config();

// api key from keys.json
var password = process.env.key

/**
* Parameters for Youtube Search
*/
var opts = {
    maxResults: 10,
    key: password,
    type: "video",
    videoCategoryId: "10",
    chart: "mostPopular"
};

/**
* This function returns API key for Youtube API.
*/
function gpassword() {
    return password;
}

/**
* This function used to search song from youtube and return links, imgs, titles, and possible errors
* Require Data: keyword
* @param {string} keyword - Song Name
* @param {function} callback - Returns an object
*/
function searchYoutube(keyword, callback) {
    let song = `${keyword} VEVO`
    // var song = `${keyword} song`
    search(song, opts, function(err, results) {
        let links = [];
        let img = [];
        let title = [];
        let error = false;
        let lessthanfiveerror = false;
        for (let i = 0;; i < results.length; i++) {
            links.push(results[i].id);
            img.push(results[i].thumbnails.high.url);
            title.push(results[i].title);
        }
        if (img.length == 0 && links.length == 0 && title.length == 0 || song == ' VEVO') {
            error = true;
        }
        else if (img.length < 10 && links.length < 10 && title.length < 10){
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
