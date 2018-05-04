var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];
var password = secret.api_key;

 
var opts = {
	maxResults: 1, 
	key: password
};

function searchYoutube(keyword) {
	search(keyword, opts, function(err, results) {
		console.log(results);

	 	
	 	// console.log("result",results);
		
		
	})
}
 
function readJSON () {
	fs.readFile('test.JSON',test);
	var test = JSON.parse(test);
}

module.exports = {
	readJSON,
	searchYoutube
};