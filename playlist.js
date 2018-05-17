const key = require('./dbkeys.json') //File that stores database credentials
var mysql = require('mysql'); //mysql module


 var connection = mysql.createConnection({ 
  host     : key.RDS_HOSTNAME,
  user     : key.RDS_USERNAME,
  password : key.RDS_PASSWORD,
  port     : key.RDS_PORT,
  database : key.RDS_DB_NAME
});

/**
* Removing Video from favourite List
* Require Data: userID, VideoID
* @param {array} user - Gets userID and VideoID
*/
function remove_from_list(user){ //Require Data: userID, VideoID
        connection.query(`DELETE FROM playlist WHERE idx = '${user.vid}' && id = '${user.id}'`,function (error, results, fields) {
          if (error) {
            console.log("error ocurred",error);
          }else{
            console.log('Result: ', results);
          }
        });
}

/**
* Add video into favourite List 
* Require Data: UserID, VideoID, Video Name
* @param {array} user - Gets userID, VideoID and Video Name
*/
function add_to_play_list(user){ //Require Data: UserID, VideoID, Video Name

    const users = {
        id:user.id,
        vid:user.vid,
        video_name:user.video_name
    }
        connection.query('INSERT INTO playlist SET ?',users, function (error, results, fields) {
          if (error) {
            console.log("error ocurred",error);
          }else{
            console.log('Result: ', results);
          }
        });
  }


/**
* Get list of songs in the favourite list
* Require Data: UserID
* @param {string} user - Gets userID
* @param {function} callback - return an object
*/
function get_song_list(id,callback){ //Require Data: UserID

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

module.exports={
  add_to_play_list,
  get_song_list,
  remove_from_list
}
