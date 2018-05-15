const key = require('./dbkeys.json') //File that stores database credentials
var mysql = require('mysql'); //mysql module

 //create connection with MySQL
 var connection = mysql.createConnection({ 
  host     : key.RDS_HOSTNAME,
  user     : key.RDS_USERNAME,
  password : key.RDS_PASSWORD,
  port     : key.RDS_PORT,
  database : key.RDS_DB_NAME
});

//Removing Video from favourite List
function remove_from_list(user){ //Require Data: userID, VideoID

    connection.connect(function(err){
      if(err){
        throw err
      }else{//If connected, delete user's selected item.
        connection.query(`DELETE FROM playlist WHERE idx = '${user.vid}' && id = '${user.id}'`,function (error, results, fields) {
          if (error) {
            console.log("error ocurred",error);
          }else{
            console.log('Result: ', results);
          }
        });
      }
    });

}

//Add video into favourite List
function add_to_play_list(user){ //Require Data: UserID, VideoID, Video Name

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

//Get list of songs in the favourite list
function get_song_list(id,callback){ //Require Data: UserID

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
                   vid.push(results[i].vid);
                   name.push(results[i].video_name)
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

// add_to_play_list('')

module.exports={
  add_to_play_list,
  get_song_list,
  remove_from_list,

}
