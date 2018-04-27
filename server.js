const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const app = express();
const login = require('./login.js')
const alert = require('alert-node')

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
    res.render('index.hbs');
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
    res.render('index.hbs');
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

app.get('/signup', function(req, res) {
    res.render('signup.hbs');
});

app.post('/login',function(req,res){
    var userId = req.body.email
    var userPw = req.body.pw
    var login_info = login.loadDatabase()
    for(i = 0; i<login_info.length;i++){
        if(userId == login_info[i].email && userPw == login_info[i].pw){
            var valid = true
        }else{
            var valid = false
        }
    }
    if(valid == false){
        alert("Login Failed")
    }else{
        alert("Login Success")
        res.redirect('/index')
    }
})

app.get('/signup',function(req,res){
    res.render('signup.hbs')
})

app.post('/signup',function(req,res){
    var id = req.body.email;
    var pw = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var user = {
        email : id,
        pw : pw,
        first: fname,
        last: lname
    }
    var login_info = login.loadDatabase()
    login_info.push(user)
    var valid = login.addUser(login_info)
    if(valid){
        alert('Successfully registered')
        res.redirect('/login')
    }
    
})

app.get('/Playlist', function(req, res) {
    res.render('Playlist.hbs')
});
app.listen(8080)