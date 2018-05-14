const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const login = require('./login.js');
const alert = require('alert-node');

const port = process.env.port || 8080;

const helper = require('./helper.js');
var sessions = require('express-session');
var youtube = require('./searchyoutube.js');
var sessions;

hbs.registerPartials(__dirname + '/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: 'asfdkk#!@^%#$@#12308dafsj',
    resave: false,
    saveUninitialized: true
}));

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
};

app.get('/', function (req, res) {
    res.render('index.hbs', {
        login: "",
        link: "login",
        home: "/",
        discover: "/discover",
        ranking: "/ranking",
        playlist: "/login",
        rating:"/rating",
        index: "-1"
    });
});

app.post('/', function(req, res) {
    var num = '/index' + req.body.acct;
    res.send("<br>Song: {0}</br><br>Favourite: {1}</br><br>Rating: {2}/5</br>"
        .format(req.body.song, req.body.favourite == "on", req.body.rating) + `<button onclick="location.href = '/index'+req.body.acct";>Back</button>`);
});

app.get('/rating', function(req, res) {
    youtube.searchYoutube(req.body.song, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            // console.log(results.links);
            let dat = [];
            for (let i = 0; i < 10; i++) {
                dat.push({
                    link: results.links[i],
                    img: results.img[i],
                    title: results.title[i],
                    styletype: i < 5 ? "searches" : "searches2"
                });
            }
            res.render('rating.hbs', {
                login: "Login/Signup",
                link: "login",
                home: "/",
                discover: "/discover",
                ranking: "/ranking",
                playlist: "/login",
                index: "-1",
                data: dat
            });
        }
    });
});

app.post('/rating', function(req, res) {
    youtube.searchYoutube(req.body.song, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            // console.log(results.links);
            let dat = [];
            for (let i = 0; i < 10; i++) {
                dat.push({
                    link: results.links[i],
                    img: results.img[i],
                    title: results.title[i],
                    styletype: i < 5 ? "searches" : "searches2"
                });
            }
            res.render('rating.hbs', {
                login: "Login/Signup",
                link: "login",
                home: "/",
                discover: "/discover",
                ranking: "/ranking",
                playlist: "/login",
                index: "-1",
                data: dat
            });
        }
    });
});

app.get('/login', function (req, res) {
    res.render('login.hbs');
});


app.get('/playlist',function(req,res){
    res.render('playlist.hbs')
})

app.post('/login', function(req, res) {
    var users = {
        email : req.body.email,
        pw : req.body.pw
    }
   console.log(login.login(users))
        
// app.post('/login', function (req, res) {
//     var userId = req.body.email;
//     var userPw = req.body.pw;
//     var login_info = login.loadDatabase();
//     var valid = false;
//     for (let i = 0; i < login_info.length; i++) {
//         if (userId == login_info[i].email && userPw == login_info[i].pw) {
//             sessions.uniqueID = req.body.username;
//             var first_name = login_info[i].first;
//             var last_name = login_info[i].last;
//             app.get('/index' + i.toString(), function(req, res) {
//                 res.render('index.hbs', {
//                     login: `Hi, ${first_name} ${last_name}`,
//                     home: "/index" + i.toString(),
//                     link: "",
//                     discover: "/discover" + i.toString(),
//                     ranking: "/ranking" + i.toString(),
//                     playlist: "/Playlist" + i.toString(),
//                     rating:"/rating"+i.toString(),
//                     index: "1",
//                     acct: i
//                 });
//             });
//             app.get('/Playlist' + i.toString(), function(req, res) {
//                 res.render('Playlist.hbs', {
//                     login: `Hi, ${first_name} ${last_name}`,
//                     home: "/index" + i.toString(),
//                     link: "",
//                     discover: "/discover" + i.toString(),
//                     ranking: "/ranking" + i.toString(),
//                     playlist: "/Playlist" + i.toString(),
//                     index: "1",
//                     acct: i
//                 });
//             });

//             app.post('/rating' + i.toString(), function(req, res) {
//                 youtube.searchYoutube(req.body.song, (errorMessage, results) => {
//                     if (errorMessage) {
//                         console.log(errorMessage);
//                     } else {
//                         // console.log(results.links);
//                         let dat = [];
//                         for (let i = 0; i < 10; i++) {
//                             dat.push({
//                                 link: results.links[i],
//                                 img: results.img[i],
//                                 title: results.title[i],
//                                 styletype: i < 5 ? "searches" : "searches2"
//                             });
//                         }
//                         res.render('rating.hbs', {
//                             login: `Hi, ${first_name} ${last_name}`,
//                             home: "/index" + i.toString(),
//                             link: "",
//                             discover: "/discover" + i.toString(),
//                             ranking: "/ranking" + i.toString(),
//                             playlist: "/Playlist" + i.toString(),
//                             rating:"/rating"+i.toString(),
//                             index: "1",
//                             acct: i,
//                             data: dat
//                         });
//                     }
//                 });
//             });
//               app.get('/rating' + i.toString(), function(req, res) {
//                 youtube.searchYoutube(req.body.song, (errorMessage, results) => {
//                     if (errorMessage) {
//                         console.log(errorMessage);
//                     } else {
//                         // console.log(results.links);
//                         let dat = [];
//                         for (let i = 0; i < 10; i++) {
//                             dat.push({
//                                 link: results.links[i],
//                                 img: results.img[i],
//                                 title: results.title[i],
//                                 styletype: i < 5 ? "searches" : "searches2"
//                             });
//                         }
//                         res.render('rating.hbs', {
//                             login: `Hi, ${first_name} ${last_name}`,
//                             home: "/index" + i.toString(),
//                             link: "",
//                             discover: "/discover" + i.toString(),
//                             ranking: "/ranking" + i.toString(),
//                             playlist: "/Playlist" + i.toString(),
//                             rating:"/rating"+i.toString(),
//                             index: "1",
//                             acct: i,
//                             data: dat
//                         });
//                     }
//                 });
//             });
//             app.get('/discover' + i.toString(), function(req, res) {
//                 var xhr = require('xhr');
//                 if (!xhr.open) xhr = require('request');
//                 let ppp = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=10&key=" +
//                     youtube.gpassword();
//                 xhr({
//                     url: ppp,
//                     method: 'GET'
//                 }, function(err, res2, body) {
//                     var result = JSON.parse(body);
//                     var randomk = helper.getRandomUniqueNumber(9, 50, 0).map(function(item) {
//                         if (result.items[item] != undefined) {
//                             return ({
//                                 lnk: result.items[item].id,
//                                 title: result.items[item].snippet.title,
//                                 viewCount: result.items[item].statistics.viewCount,
//                                 rev: Math.random() > 0.5,
//                                 display: true
//                             });
//                         }
//                         return ({
//                             lnk: "",
//                             title: "",
//                             viewCount: "",
//                             rev: 0,
//                             display: false
//                         });
//                     });
//                     res.render('discover.hbs', {
//                         data: randomk,
//                         login: `Hi, ${first_name} ${last_name}`,
//                         home: "/index" + i.toString(),
//                         link: "",
//                         discover: "/discover" + i.toString(),
//                         ranking: "/ranking" + i.toString(),
//                         playlist: "/Playlist" + i.toString(),
//                         index: "1",
//                         acct: i
//                     });
//                 });
//             });
//             app.get('/ranking' + i.toString(), function(req, res) {
//                 res.render('ranking.hbs', {
//                     login: `Hi, ${first_name} ${last_name}`,
//                     home: "/index" + i.toString(),
//                     link: "",
//                     ranking: "/ranking" + i.toString(),
//                     playlist: "/Playlist" + i.toString(),
//                     index: "1",
//                     discover: "/discover" + i.toString(),
//                     acct: i
//                 });
//             });
//             var valid = true;
//             res.redirect('/index' + i.toString());
//             break;
//         }
//     }
//     if (!valid) {
//         res.render('login.hbs');
//         alert("Login Failed");

    
    // app.get('/index', function(req, res) {
    //                 res.render('index.hbs', {
    //                     login: first_name,
    //                     home: "/index",
    //                     link: "",
    //                     ranking: "/ranking",
    //                     playlist: "/Playlist",
    //                     search: "/searchpage",
    //                     index: "1",
    //                     searchindex: "-1",
    //                     acct: i
    //                 });
    //             });
    //             app.get('/Playlist', function(req, res) {
    //                 res.render('Playlist.hbs');
    //             });
    //             var valid = true;
    //             res.redirect('/index');
    //             break;
    //         } else {
    //             var valid = false;
    //         }
    //     }
    //     if (!valid) {
    //         res.render('login.hbs');
    //         alert("Login Failed");
    // }
});
// app.post('/login', function(req, res) {
//     var userId = req.body.email;
//     var userPw = req.body.pw;
//     var login_info = login.loadDatabase();
//     for (i = 0; i < login_info.length; i++) {
//         if (userId == login_info[i].email && userPw == login_info[i].pw) {
//             sessions.uniqueID = req.body.username;
//             var first_name = login_info[i].first;
//             var last_name = login_info[i].last;
//             app.get('/index', function(req, res) {
//                 res.render('index.hbs', {
//                     login: first_name,
//                     home: "/index",
//                     link: "",
//                     ranking: "/ranking",
//                     playlist: "/Playlist",
//                     search: "/searchpage",
//                     index: "1",
//                     searchindex: "-1",
//                     acct: i
//                 });
//             });
//             app.get('/Playlist', function(req, res) {
//                 res.render('Playlist.hbs');
//             });
//             var valid = true;
//             res.redirect('/index');
//             break;
//         } else {
//             var valid = false;
//         }
//     }
//     if (!valid) {
//         res.render('login.hbs');
//         alert("Login Failed");
//     }
// });


app.get('/signup', function(req, res) {
    res.render('signup.hbs');
});
app.post('/edit', function (req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var profilepic = req.body.profilepic;

    var user = {
            email: id,
            pw: pw,
            first: fname,
            last: lname,
            profilepic: profilepic,
        };

    var login_info = login.loadDatabase();
    for (let i = 0; i < login_info.length; i++) {
        if (id == login_info[i].email) {
    login_info.splice(i, 1);
    login_info.push(user);

        var valid = login.addUser(login_info);
        if (valid) {
            alert('Succesfully changed my account');
            res.redirect('/index'+i.toString());
        }
    }
}
});
app.post('/signup', function (req, res) {
    var id = req.body.email;
    var pw = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
    // console.log(req.body);
    if (id == "" || pw == "" || fname == "" || lname == "") {
        res.redirect('/signup');
        alert('Missing Values');
    } else {
        var user = {
            email: id,
            pw: pw,
            first: fname,
            last: lname
        }
        login.register(user)
    }

});

app.get('/discover', function (req, res) {
    var xhr = require('xhr');
    if (!xhr.open) xhr = require('request');
    let ppp = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=10&key=" +
        youtube.gpassword();
    xhr({
        url: ppp,
        method: 'GET'
    }, function (err, res2, body) {
        var result = JSON.parse(body);
        var randomk = helper.getRandomUniqueNumber(9, 50, 0).map(function (item) {
            if (result.items[item] != undefined) {
                return ({
                    lnk: result.items[item].id,
                    title: result.items[item].snippet.title,
                    viewCount: result.items[item].statistics.viewCount,
                    rev: Math.random() > 0.5,
                    display: true
                });
            }
            return ({
                lnk: "",
                title: "",
                viewCount: "",
                rev: 0,
                display: false
            });
        });
        res.render('discover.hbs', {
            data: randomk,
            login: "Login/Signup",
            link: "login",
            home: "/",
            ranking: "/ranking",
            playlist: "/login",
            index: "-1"

        });
    });
});

app.get('/ranking', function(req, res) {
    res.render('ranking.hbs', {
        login: "Login/Signup",
        link: "login",
        home: "/",
        discover: "/discover",
        ranking: "/ranking",
        playlist: "/login",
        index: "-1"
    });
});


app.listen(port,()=> {
    console.log(`server up on http://localhost:${port}`);    
});