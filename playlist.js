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
};
function add_to_play_list(user){
  return user
};
// function get_play_list(user){
//   return user
// };
function get_song_list(user){
  return user
}

// var user ={
//   id: 3,
//   pid:2,
//   name: "my list"
// }
// create_play_list(user)
// function create_play_list(user){

//   const users = {
//      id: user.id,
//      pid: user.pid,
//      pname: user.pid
//   }
//     connection.query('INSERT INTO playlist SET ?',users, function (error, results, fields) {
//       if (error) {
//         console.log("error ocurred",error);
//       }else{
//         console.log('Result: ', results);
//       }
//     });
//     connection.end()
// }

// function get_song_list(playlist){
//   return playlist
// }

// function add_to_play_list(user){
//     let id = user.id
//     let pid = user.pid
//     let song = user.vid
//     const users = {
//         id:user.id,
//         pid:user.pid,
//         song:user.vid
//     }
    
//     connection.query('INSERT INTO songs SET ?',users, function (error, results, fields) {
//       if (error) {
//         console.log("error ocurred",error);
//       }else{
//         console.log('Result: ', results);
//       }
//     });
//     connection.end()
//   }

function get_play_list(id,callback){

    connection.connect(function(err) {
        if (err) { //if database fail connecting
          console.error('Database connection failed: ' + err.stack);
          return
        } //if database connected
        console.log('Connected to database.');
      });

    connection.query(`SELECT * FROM playlist WHERE id = ?`,[id], function(error, results, fields){
        if(error){
            console.log("error",error)
        }else{
            let pid = []
            let pname = []
            if(results.length >0){
                for(i = 0; i <results.length;i++){
                   pid.push(results[i].pid);
                   pname.push(results[i].play_name)
                }
                callback(undefined,{
                  pid : pid
                });
            }else{
                console.log("error2")
            }
        }
    });
    connection.end();
}

module.exports={
  create_play_list,
  get_play_list,
  add_to_play_list,
  get_song_list
}
