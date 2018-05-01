var search = require('youtube-search');
var keyWord = '';
// var secret = require('./keys');
var fs = require('fs');
var list = [];
var password = "";


var opts = {
    maxResults: 1,
    key: password
};

function searchYoutube(keyword, callback) {
    search(keyword, opts, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback(undefined, { link: results[0].link.split('=')[1] })
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

// searchYoutube("Drake God's Plan", (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(results)
//     }
// });