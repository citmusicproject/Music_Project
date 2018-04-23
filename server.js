const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname +'/views/partial');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('about.hbs',{
		title: "Top 100 Hits"
		
	});
});

app.listen(8080)
