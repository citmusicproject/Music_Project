const key = require('./dbkeys.js') //File that stores database credentials
var mysql = require('mysql'); //mysql module


function remove_from_list(user){
    //create connection with MySQL
    var connection = mysql.createConnection({ 
      host     : key.RDS_HOSTNAME,
      user     : key.RDS_USERNAME,
      password : key.RDS_PASSWORD,
      port     : key.RDS_PORT,
      database : key.RDS_DB_NAME
    });

    let users= {
      id : user.id,
      vid : user.vid
    }
    let id = user.id;
    let vid = user.vid
    let sql = `DELETE FROM playlist WHERE vid = ${vid} and id = ${id}`
    console.log(sql)
    connection.connect(function(err){
      if(err){
        throw err
      }else{
        connection.query( sql ,function (error, results, fields) {
          if (error) {
            console.log("error ocurred",error);
          }else{
            console.log('Result: ', results);
          }
        });
      }
    });

}

function add_to_play_list(user){

  //create connection with MySQL
  var connection = mysql.createConnection({ 
    host     : key.RDS_HOSTNAME,
    user     : key.RDS_USERNAME,
    password : key.RDS_PASSWORD,
    port     : key.RDS_PORT,
    database : key.RDS_DB_NAME
  });

    const users = {
        id:user.id,
        vid:user.vid,
        video_name:user.video_name
    }
  connection.connect(function(err){
    if(err){
      throw error
    }else{
      connection.query('INSERT INTO playlist SET ?',users, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
        }else{
          console.log('Result: ', results);
        }
      });
    }
  });

  }

  var user = {
    id : 2,
    vid : 1,
    video_name: 'Dodie-you'
  }
  // add_to_play_list(user)
  remove_from_list(user)

function get_song_list(id,callback){
  //create connection with MySQL
  var connection = mysql.createConnection({ 
    host     : key.RDS_HOSTNAME,
    user     : key.RDS_USERNAME,
    password : key.RDS_PASSWORD,
    port     : key.RDS_PORT,
    database : key.RDS_DB_NAME
  });

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
            let vid = []
            let name = []
            if(results.length >0){
                for(i = 0; i <results.length;i++){
                   vid.push(results[i].pid);
                   name.push(results[i].play_name)
                }
                callback(undefined,{
                  vid : vid,
                  name: name
                });
            }else{
                console.log("error2")
            }
        }
    });

}

module.exports={
  add_to_play_list,
  get_song_list
}
