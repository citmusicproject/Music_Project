const fs = require('fs');
const db = require('./accdata.json');

var loadDatabase = () => {
    var accdata = JSON.stringify(db);
    var data = JSON.parse(accdata);
    return data;
}

var addUser = (accdata) => {
    var valid = true;
    console.log("accountdata:", accdata);
    fs.writeFile('accdata.json', JSON.stringify(accdata), (error) => {
        if (error) {
            valid = false;
        }
    });
    return valid;
}


module.exports = {
    loadDatabase,
    addUser
};

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'aa4315',
//   database : 'user_db'
// });

// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected");
// } else {
//     console.log("Error connecting database");
// }
// });

// exports.register = function(req,res){
//     // console.log("req",req.body);
//     var today = new Date();
//     var users={
//       "first_name":req.body.first_name,
//       "last_name":req.body.last_name,
//       "email":req.body.email,
//       "password":req.body.password,
//       "created":today,
//       "modified":today
//     }
//     connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
//     if (error) {
//       console.log("error ocurred",error);
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }else{
//       console.log('Result: ', results);
//       res.send({
//         "code":200,
//         "success":"user registered sucessfully"
//           });
//     }
//     });
//   }

//   exports.login = function(req,res){
//     var email= req.body.email;
//     var password = req.body.password;
//     connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
//       console.log([email])
//     if (error) {
//       console.log("error ocurred",error);
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }else{
//       console.log('The login result: ', results);
//       if(results.length >0){
//         if(results[0].password === password){
//           res.send({
//             "code":200,
//             "success":"login sucessfull"
//               });
//         }
//         else{
//           res.send({
//             "code":204,
//             "success":"Email and password does not match"
//               });
//         }
//       }
//       else{
//         res.send({
//           "code":204,
//           "success":"Email does not exits"
//             });
//       }
//     }
//     });
//   }