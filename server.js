const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const login = require('./login.js');
const alert = require('alert-node');

hbs.registerPartials(__dirname + '/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
}

app.get('/', function (req, res) {
    res.render('index.hbs', {
        login: "Log in or Sign up",
        link: "login",
        home: "/",
        discover: "/login",
        playlist: "/login",
        index: "-1"
    });
});

app.post('/', function (req, res) {
    var num = '/index' + req.body.acct;
    res.send("<br>Song: {0}</br><br>Favourite: {1}</br><br>Rating: {2}/5</br>"
        .format(req.body.song, req.body.favourite == "on", req.body.rating) +
        `<button onclick="location.href = '/index'+req.body.acct ";>Back</button>`);
});

app.post('/rating', function (req, res) {
    console.log(req.body);
    res.render('rating.hbs', {
        title: "Rating",
        data: req.body
    });
});

app.get('/login', function (req, res) {
    res.render('login.hbs');
});

app.post('/login', function (req, res) {
    var userId = req.body.email;
    var userPw = req.body.pw;
    var login_info = login.loadDatabase();
    for (i = 0; i < login_info.length; i++) {
        if (userId == login_info[i].email && userPw == login_info[i].pw) {
            var first_name = login_info[i].first;
            var last_name = login_info[i].last;
            // console.log(first_name);
            // alert("Login Success")
            app.get('/index' + i.toString(),
                function (req, res) {
                    res.render('index.hbs',
                        {
                            login: `Hi, ${first_name} ${last_name} ${userId}`,
                            home: "/index" + i.toString(),
                            link: "",
                            discover: "/discover",
                            playlist: "/Playlist" + i.toString(),
                            index: "1",
                            acct: i
                        });
                });
            app.get('/Playlist' + i.toString(),
                function (req, res) {
                    res.render('Playlist.hbs');
                });
            var valid = true
            res.redirect('/index' + i.toString());
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


app.get('/signup', function (req, res) {
    res.render('signup.hbs');
});

app.post('/signup', function (req, res) {
    var id = req.body.email;
    var pw = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
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
        var login_info = login.loadDatabase();
        login_info.push(user);
        var valid = login.addUser(login_info);
        if (valid) {
            alert('Successfully registered');
            res.redirect('/login');
        }
    }
});

app.listen(8080)