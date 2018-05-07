var search = require('youtube-search');
var keyWord = '';
var secret = require('./keys');
var fs = require('fs');
var list = [];
const request = require('request');
var password = secret.key;
var opts = {
    maxResults: 10,
    // videoCategoryId: 10,
    key: password,
    type: "video",
    videoCategoryId: "10"
};

// fs.readFile('keys', (er, da) => {
//     password = da.toString().substring(1);
//     opts = {
//         maxResults: 5,
//         key: password
//     }
// });


function gpassword() {
    return password
}

function searchYoutube(keyword, callback) {
    search(keyword, opts, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            var i = 0;
            var links = [];
            var img = [];
            var title = [];

            for (var i = 0; i < results.length; i++) {
                links.push(results[i].id);
                img.push(results[i].thumbnails.default.url);
                title.push(results[i].title);
            }
            callback(undefined, {
                links:links,img:img,title:title
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

function youtubesearch(keyword, callback) {
    var dict = []
    var searchsong = (keyword) => {
            keyword=keyword.replace(/ /g,"_");
            request({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}
                &type=video&videoCategoryId=10&key=AIzaSyA-HLMdUs5ve4uldOOTcfT7BtfWELHfJL8`,
                json: true
            }, (error, response, body) => {
                if (error) {
                    console.log(error);
                } else {
                      for (i = 0; i < 10; i++) {
                            dict.push({
                                "title": body.items[i].snippet.title,
                                "videoId": "http://www.youtube.com/embed/" + body.items[i].id.videoId,
                                "thumbnails" : body.items[i].snippet.thumbnails.default.url
                            })
                        }
                    callback(undefined,{title:body.items[0].snippet.title})
                }
            });
    };
};


function readJSON() {
    fs.readFile('test.JSON', test);
    var test = JSON.parse(test);
}

module.exports = {
    readJSON,
    searchYoutube,
    gpassword,
    youtubesearch
};

// searchYoutube('Drake', (errorMessage, results) => {
//         if (errorMessage) {
//             console.log(errorMessage);
//         } else {
//             console.log(results.links[0]);
//         }
//     });