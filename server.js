const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const login = require('./login.js');
const alert = require('alert-node');
const helper = require('./helper.js');
const info = {
    login: "Login/Signup",
    link: "login",
    home: "/",
    discover: "/discover",
    ranking: "/ranking",
    playlist: "/login",
    index: "-1",
    search: "/rating"
}
var sessions = require('express-session');
var youtube = require('./searchyoutube.js');
var sessions;
// const login = false

// app.use(function(req,res,next) {

// })

hbs.registerPartials(__dirname + '/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
    secret: '4334rfgy89olkmnbgr4323456jhgfd3',
    resave: false,
    saveUninitialized: true
}));

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
};

app.get('/', function(req, res) {
    res.render('index.hbs', {
        info: info
    });
});

app.post('/', function(req, res) {
    res.send("<br>Song Link: {0}</br><br>Song Name: {1}</br><br>Favourite: {2}</br><br>Rating: {3}/5</br>"
        .format(req.body.songlink, req.body.songname, req.body.favourite == "on", req.body.rating) + `<button onclick="location.href = '/rating'";>Back</button>`);
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
                info: info,
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
                info: info,
                data: dat
            });
        }
    });
});

app.get('/login', function(req, res) {
    req.session.destroy();
    res.render('login.hbs');
});


app.post('/login', function(req, res) {
    var users = {
        email: req.body.email,
        pw: req.body.pw
    }
    const login1 = true
    login.login(users, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else if (results) {
            alert('Login Successful')
            if (!results) {
                return res.status(404).send();
            }
            const info = {
                login: `Hi, ${results.data[0].first_name} ${results.data[0].last_name}`,
                home: `/index${results.data[0].id}`,
                link: "",
                discover: `/discover${results.data[0].id}`,
                ranking: `/ranking${results.data[0].id}`,
                playlist: `/playlist${results.data[0].id}`,
                search: `/rating${results.data[0].id}`,
                index: "1",
                signout: '/signout',
                login1: true
            }
            req.session.user = results;
            app.get('/signout', function(req, res) {
                req.session.destroy();
                res.redirect('/');
                // return res.status(200).send();
            })
            app.get(`/index${results.data[0].id}`, function(req, res) {
                if (!req.session.user) {
                    return res.status(401).send()
                }
                res.render('index.hbs', {
                    info: info
                });
            });
            app.get(`/playlist${results.data[0].id}`, function(req, res) {
                if (!req.session.user) {
                    return res.status(401).send()
                }
                res.render('Playlist.hbs', {
                    info: info
                });
            });
            app.post(`/rating${results.data[0].id}`, function(req, res) {
                if (!req.session.user) {
                    return res.status(401).send()
                }
                youtube.searchYoutube(req.body.song, (errorMessage, results) => {
                    if (errorMessage) {
                        console.log(errorMessage);
                    } else {
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
                            info: info,
                            data: dat
                        });
                    }
                });
            });
            app.get(`/discover${results.data[0].id}`, function(req, res) {
                if (!req.session.user) {
                    return res.status(401).send()
                }
                var xhr = require('xhr');
                if (!xhr.open) xhr = require('request');
                let ppp = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=10&key=" +
                    youtube.gpassword();
                xhr({
                    url: ppp,
                    method: 'GET'
                }, function(err, res2, body) {
                    var result = JSON.parse(body);
                    var randomk = helper.getRandomUniqueNumber(9, 50, 0).map(function(item) {
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
                        info: info
                    });
                });
            });
            app.get(`/ranking${results.data[0].id}`, function(req, res) {
                if (!req.session.user) {
                    return res.status(401).send()
                }
                res.render('ranking.hbs', {
                    info: info
                });
            });
            res.redirect(`/index${results.data[0].id}`)
            return res.status(200).send();
        }
    });

});


app.get('/signup', function(req, res) {
    res.render('signup.hbs');
});

// app.post('/edit', function(req, res) {
// });

app.post('/signup', function(req, res) {
    var id = req.body.email;
    var pw = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
    if (id.length <= 8 || pw.length <= 8 || fname.length <= 0 || lname.length <= 0) {
        res.redirect('/signup');
        alert('Invaild Input(s)');
    } else {
        var user = {
            email: id,
            pw: pw,
            first: fname,
            last: lname
        }
        login.register(user)
        alert('Sign Up Successful');
        res.redirect('/login')
    }

});

app.get('/discover', function(req, res) {
    var xhr = require('xhr');
    if (!xhr.open) xhr = require('request');
    let ppp = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=10&key=" +
        youtube.gpassword();
    xhr({
        url: ppp,
        method: 'GET'
    }, function(err, res2, body) {
        var result = JSON.parse(body);
        var randomk = helper.getRandomUniqueNumber(9, 50, 0).map(function(item) {
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
            info: info
        });
    });
});

app.get('/ranking', function(req, res) {
    res.render('ranking.hbs', {
        info: info
    });
});

app.listen(8080,function(){
   console.log('Server listening on port 8080');
});