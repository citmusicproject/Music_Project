const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const login = require('./login.js');
const alert = require('alert-node');
var sessions = require('express-session');
var youtube = require('./searchyoutube.js');

var sessions;

hbs.registerPartials(__dirname + '/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: 'asfdkk#!@^%#$@#12308dafsj',
    resave: false,
    saveUninitialized: true

}))

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
};

app.get('/', function(req, res) {
    res.render('index.hbs', {
        login: "Login/Signup",
        link: "login",
        home: "/",
        // search: "/searchpage",
        ranking: "/ranking",
        // searchindex: req.body.searchindex,
        playlist: "/login",
        index: "-1"
    });
});

app.get('/ranking', function(req, res) {
    res.render('ranking.hbs');
});

app.post('/', function(req, res) {
    var num = '/index' + req.body.acct;
    res.send("<br>Song: {0}</br><br>Favourite: {1}</br><br>Rating: {2}/5</br>"
        .format(req.body.song, req.body.favourite == "on", req.body.rating) + `<button onclick="location.href = '/index'+req.body.acct";>Back</button>`);
});


app.post('/rating', function(req, res) {
    youtube.searchYoutube(req.body.song, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            res.render('rating.hbs', {
                links: results.links[0],
                img: results.img[0],
                title: results.title[0]
            });
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login.hbs');
});

app.post('/login', function(req, res) {
    var userId = req.body.email;
    var userPw = req.body.pw;
    var login_info = login.loadDatabase();
    for (i = 0; i < login_info.length; i++) {
        if (userId == login_info[i].email && userPw == login_info[i].pw) {
            sessions.uniqueID = req.body.username;
            var first_name = login_info[i].first;
            var last_name = login_info[i].last;
            app.get('/index', function(req, res) {
                res.render('index.hbs', {
                    login: first_name,
                    home: "/index",
                    link: "",
                    ranking: "/ranking",
                    playlist: "/Playlist",
                    search: "/searchpage",
                    index: "1",
                    searchindex: "-1",
                    acct: i
                });
            });
            app.get('/Playlist', function(req, res) {
                res.render('Playlist.hbs');
            });
            var valid = true;
            res.redirect('/index');
            break;
        } else {
            var valid = false;
        }
    }
    if (!valid) {
        res.render('login.hbs');
        alert("Login Failed");
    }
});


app.get('/signup', function(req, res) {
    res.render('signup.hbs');
});
app.get('/searchpage', function(req, res) {
    res.render('searchpage.hbs', {
        login: req.body.login,
        home: req.body.home,
        ranking: req.body.ranking,
        playlist: req.body.playlist,
        index: req.body.index,
        searchindex: req.body.searchindex,
        acct: req.body.acct

    });
});

app.post('/signup', function(req, res) {
    var id = req.body.email;
    var pw = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
    console.log(req.body);
    if (id == "" || pw == "" || fname == "" || lname == "") {
        res.redirect('/signup');
        alert('Missing Values');
    } else {
        var user = {
            email: id,
            pw: pw,
            first: fname,
            last: lname
        };
        var login_info = login.loadDatabase();
        login_info.push(user);
        var valid = login.addUser(login_info);
        if (valid) {
            alert('Successfully registered');
            res.redirect('/login');
        }
    }

});

app.get('/discover', function(req, res) {
    var xhr = require('xhr');
    if (!xhr.open) xhr = require('request');
    let ppp = "https://www.googleapis.com/youtube/v3/videos?part=statistics&chart=mostPopular&maxResults=25&videoCategoryId=10&key=" +
        youtube.gpassword();
    xhr({
        url: ppp,
        method: 'GET'
    }, function(err, res2, body) {
        var result = JSON.parse(body);
        var randomk = parseInt(Math.random() * 25);
        res.render('discover.hbs', { lnk: result.items[randomk].id });
    });
});

app.listen(8080);