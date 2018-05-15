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

//Get rating of Video
function get_rating(vid,callback){

    connection.query(`SELECT * FROM playlist WHERE vid = ?`,[vid], function(error, results, fields){
        if(error){
            return error
        }else{
            let sum_of_rate = 0
            if(results.length >0){
                for(i = 0; i <results.length;i++){
                   sum_of_rate += results[i].rating
                }
                sum_of_rate = sum_of_rate / results.length;
                callback(undefined,sum_of_rate);
            }else{
                console.log("error2")
            }
        }
    });
}

//Add rating for video
function add_rating(user){ //require data: userID, videoID, Rating
  let sql = `update playlist set rating = ${user.rating} WHERE id = '${user.id}' && vid = '${user.vid}'`
  connection.connect(function(err){
    if(err){
      return err
    }else{
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
        }else{
          console.log('Result: ', results);
        }
      });
    }
  });

}

module.exports={
  add_rating,
  get_rating

}