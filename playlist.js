const key = require('./dbkeys.js') //File that stores database credentials
var mysql = require('mysql'); //mysql module

//create connection with MySQL
var connection = mysql.createConnection({ 
  host     : key.RDS_HOSTNAME,
  user     : key.RDS_USERNAME,
  password : key.RDS_PASSWORD,
  port     : key.RDS_PORT,
  database : key.RDS_DB_NAME
});

function create_play_list(user){
    return user
}

// function add_to_play_list(user){
//     let id = user.id
//     let pid = user.pid
//     let song = user.vid
//     const users = {
//         "first_name":user.first,
//         "last_name":user.last,
//         "email":user.email,
//         "password":user.pw,
//         "created":today,
//         "modified":today
//     }
    
//     connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
//       if (error) {
//         console.log("error ocurred",error);
//       }else{
//         console.log('Result: ', results);
//       }
//     });
//     connection.end()

// }

// function get_play_list(id){

//     connection.connect(function(err) {
//         if (err) { //if database fail connecting
//           console.error('Database connection failed: ' + err.stack);
//           return;
//         } //if database connected
//         console.log('Connected to database.');
//       });

//     connection.query(`SELECT * FROM playlist WHERE id = ?`,[id], function(error, results, fields){
//         if(error){
//             console.log("error",error)
//         }else{
//             let pid = []
//             if(results.length >0){
//                 for(i = 0; i <results.length;i++){
//                     pid.push(results[i].pid)
//                 }
//                 console.log(pid)
//             }else{
//                 console.log("error2")
//             }
//         }
//     });
//     connection.end();
// }

// function get_songs(pid){
    
// }
// get_play_list("1")