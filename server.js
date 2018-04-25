const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

app.get('/', function(req, res) {
    res.send('<a href="/search">Search</a><p></p><a href="/index">Home</a><p></p><a href="/login">Login</a><p></p><a href="/Playlist">Playlist</a>')
});

app.post('/', function(req, res) {
    res.send("Song: {0}\nFavourite: {1}\nRating: {2}/5\n"
        .format(req.body.song, req.body.favourite, req.body.rating)+"<a href='/'>Back</a>")
    // console.log(req.body);
});

app.get('/search', function(req, res) {
    res.render('search.hbs', {
        title: "Search"
    });
});
app.get('/index', function (req, res) {
    res.render('index.hbs', {
        title: "Uhhh"
    });
});

app.post('/rating', function(req, res) {
    res.render('rating.hbs', {
        title: "Rating",
        data: req.body
    });
    // console.log(req.body);
});

app.get('/login', function(req, res) {
    res.render('login.hbs');
});

app.get('/Playlist', function(req, res) {
    res.render('Playlist.hbs')
});
app.listen(8080)