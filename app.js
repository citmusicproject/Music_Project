var search = require('youtube-search');
var keyWord = '';

 
var opts = {
  maxResults: 25,
  key: 'AIzaSyA-HLMdUs5ve4uldOOTcfT7BtfWELHfJL8 '
};
 
search(keyWord, opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results[0].id);
});