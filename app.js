var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];
var password = secret.api_key;

 
var opts = {
	maxResults: 5, 
	key: password
};

function searchYoutube(keyword) {
	search(keyword, opts, function(err, results) {
		if(err) return console.log(err);
	 

		var i;
		for (i = 0; i < results.length; i++) { 
			list.push(results[i].link);

		}
		
		
	 	var test = JSON.stringify(list);
	  	fs.writeFile('test.JSON', test);
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