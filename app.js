var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');

var password = secret.api_key;

 
var opts = {
  maxResults: 1,
  key: password
};
 
search('jsconf', opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results);
});