var search = require('youtube-search');
var keyWord = 'Beyonce';
var secret = 'AIzaSyA-HLMdUs5ve4uldOOTcfT7BtfWELHfJL8';
var fs = require('fs');
var list = [];

const request = require('request');

var password = secret.key;

var opts = {
    maxResults: 10,
    key: secret,
    type: "video"
    };

function searchSettings() {
	return opts;
};



    
search(keyWord, searchSettings(), function(err, results){
	if (err) {
    	console.log(err);
    } else {
    	return results.length;
    }
});

search('Beyonce',searchSettings())

module.exports = {
    search,
    searchSettings
};