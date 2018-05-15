// const key = require('./dbkeys.js') //File that stores database credentials
// var mysql = require('mysql'); //mysql module

//create connection with MySQL
// var connection = mysql.createConnection({ 
//   host     : key.RDS_HOSTNAME,
//   user     : key.RDS_USERNAME,
//   password : key.RDS_PASSWORD,
//   port     : key.RDS_PORT,
//   database : key.RDS_DB_NAME
// });

// connection.connect(function(err) {
//   if (err) { //if database fail connecting
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   } //if database connected
//   console.log('Connected to database.');
// });

function register(user){
  console.log('user data', user)
  const today = new Date();
  const users = {
      "first_name":user.first,
      "last_name":user.last,
      "email":user.email,
      "password":user.pw,
      "created":today,
      "modified":today
  }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
    }else{
      console.log('Result: ', results);
    }
  });

} 

function login(user){
  const email = user.email;
  const password = user.pw
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    console.log([email])
  if (error) {
    console.log("error ocurred",error);
  }else{
    if(results.length >0){
      if(results[0].password === password){
        console.log("sucessfull")
      }else{
        console.log("password not match")
      }
    }else{
      console.log("email does not exit")
    }
  }
    });
  }

  module.exports={
    register,
    login
  }