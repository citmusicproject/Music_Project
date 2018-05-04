var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];
var password = secret.key;
var opts = {
    maxResults: 10,
    key: password
};

// fs.readFile('keys', (er, da) => {
//     password = da.toString().substring(1);
//     opts = {
//         maxResults: 5,
//         key: password
//     }
// });


function gpassword() {
    return opts.keys;
}

function searchYoutube(keyword, callback) {
    search(keyword, opts, function(err, results) {
        if (err) {
            console.log(err);
        } else {

        	console.log(results);
        	var i = 0;
        	var list = [];
        	var channelImg = [];
        	var channelTitle = [];
        	console.log(results[0].link);

     
            
            for (var i = 0; i < results.length; i++) {
                if (results[i].link.includes('/channel/')) {
                    continue;
                }else {


        			list.push(results[i].link.split('=')[1]);
        			channelImg.push(results[i].thumbnails.default.url);
        			channelTitle.push(results[i].title);
        			


                }



        	}
        	
        	

            callback(undefined, {
                link: list[0],
                link1: list[1],
                link2: list[2],
                thumbnails : channelImg[0],
                thumbnails1 : channelImg[1],
                thumbnails2 : channelImg[2],
                title: channelTitle[0],
                title1: channelTitle[1],
                title2: channelTitle[2]
            });
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
//         // console.log(results)
//     }
// });