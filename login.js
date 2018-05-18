var mysql = require('mysql'); //mysql module
const bcrypt = require('bcrypt'); // used to encrypt passwords
const alert = require('alert-node'); //use to alert users

const db = require('./database.js')
const swal = require('sweetalert2')

//random unique id generator
var uniqueID = function () {
    return Math.random().toString(36).substr(2, 8);
};

//creates accounts
function register(user) {
    console.log('user data', user);
    const today = new Date();
    const id = uniqueID();
    const users = {
        "id": id,
        "first_name": user.first,
        "last_name": user.last,
        "email": user.email,
        "password": bcrypt.hashSync(user.pw, bcrypt.genSaltSync(10)),
        "created": today,
        "modified": today
    };
    db.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
        } else {
            // console.log('Result: ', results);
            // console.log(users.password);
            console.log('Successful');
        }
    });

}

//login feature
function login(user, callback) {
    const email = user.email;
    const password = user.pw;
    db.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
        } else {
            if (results.length > 0) {
                if (bcrypt.compareSync(password, results[0].password)) {
                    console.log("successful");
                    callback(undefined, {
                        data: results
                    });
                } else {
                    console.log("password not match");
                    alert('Incorrect Password');
                }
            } else {
                console.log("email does not exist")
                alert("Invaild Password");
            }
        }
    });
}

// function del_user(email){

// }

//exports functions
module.exports = {
    register,
    login
};