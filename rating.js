const db = require('./database.js')

/**
* This function get the rating of Video from 0.5 to 5 for video from the sql database.
* Requires: video id 
* @param {string} vid - Youtube Video id 
* @param {function} callback - Returns an object
*/
function get_rating(vid, callback) {

    db.query(`SELECT * FROM playlist WHERE vid = ?`, [vid], function(error, results, fields) {
        if (error) {
            return error
        } else {
            let sum_of_rate = 0
            if (results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    sum_of_rate += results[i].rating
                }
                sum_of_rate = sum_of_rate / results.length;
                callback(undefined, sum_of_rate);
            } else {
                console.log("Video is not yet rated")
            }
        }
    });
}


/**
* This function add a rating from 0.5 to 5 for video from the sql database.
* @param {function} callback - Returns an object
*/
function add_rating(user) { //require data: userID, videoID, Rating
    let sql = `update playlist set rating = ${user.rating} WHERE id = '${user.id}' && vid = '${user.vid}'`
    db.query(sql, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
        } else {
            console.log('Result: ', results);
        }
    });
}


/**
* This function gets the top songs from the sql database.
* @param {function} callback - Returns an object
*/
function top_songs(callback) {
    let topsong = `select video_name, vid, avg(rating) as 'avg' from playlist where rating is not null group by vid order by avg(rating) DESC limit 10;`
    db.query(topsong, function(error, results, fields) {
      let vid = []
          name = []
          avg = []
        if (error) {
            console.log('Error', error);
        } else {
            for (i = 0; i < results.length; i++) {
                vid.push(results[i].vid);
                name.push(results[i].video_name)
                avg.push(results[i].avg)
            }
            callback(undefined,{
              vid: vid,
              name: name,
              songavg: avg
            })
        }
    });
}

//export functions
module.exports = {
    add_rating,
    get_rating,
    top_songs
}