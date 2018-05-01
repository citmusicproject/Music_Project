var search = require('youtube-search');
var keyWord = '';
// var secret = require('./keys');
var fs = require('fs');
var list = [];
var password = 'AIzaSyAuK7T4XQJvYKvA03i19XlVWGBdkmkMo_U';


var opts = {
    maxResults: 5,
    key: password
};

function searchYoutube(keyword, callback) {
    search(keyword, opts, function(err, results) {
        if (err) {
            console.log(err);
        } else {
        	var i = 0;
            callback(undefined, {
                link: results[0].link.split('=')[1],
                thumbnails : results[0].thumbnails.default.url,
                title: results[0].title
            })
        }
        // var i;
        // for (i = 0; i < results.length; i++) {
        //     list.push(results[i].link);

        // }
        // var test = JSON.stringify(list);
        // fs.writeFile('test.JSON', test);

    });
};

function readJSON() {
    fs.readFile('test.JSON', test);
    var test = JSON.parse(test);
}

module.exports = {
    readJSON,
    searchYoutube
};

// searchYoutube("Drake", (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(results)
//     }
// });