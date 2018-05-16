const key = require('./dbkeys.js') //File that stores database credentials
var mysql = require('mysql'); //mysql module
const bcrypt = require('bcrypt'); // used to encrypt passwords
const alert = require('alert-node');

//random unique id generator
var uniqueID = function () {
    return Math.random().toString(36).substr(2, 8);
  };

//create connection with MySQL
var connection = mysql.createConnection({
    host: key.RDS_HOSTNAME,
    user: key.RDS_USERNAME,
    password: key.RDS_PASSWORD,
    port: key.RDS_PORT,
    database: key.RDS_DB_NAME
});

connection.connect(function(err) {
    if (err) { //if database fail connecting
        console.error('Database connection failed: ' + err.stack);
        return;
    } //if database connected
    console.log('Connected to Login database.');
});

function register(user) {
    console.log('user data', user)
    const today = new Date();
    const id = uniqueID();
    const users = {
        "id":id,
        "first_name": user.first,
        "last_name": user.last,
        "email": user.email,
        "password": bcrypt.hashSync(user.pw, bcrypt.genSaltSync(10)),
            "created": today,
            "modified": today
        }
        connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
            } else {
                console.log('Result: ', results);
                console.log(users.password);
            }
        });

    }

    function login(user, callback) {
        const email = user.email;
        const password = user.pw
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
            } else {
                if (results.length > 0) {
                    if (bcrypt.compareSync(password, results[0].password)) {
                        console.log("successful")
                        callback(undefined, {
                            data: results
                        });
                    } else {
                        console.log("password not match")
                        alert('Incorrect Password')
                    }
                } else {
                    console.log("email does not exist")
                    alert(`Invaild Email`)
                }
            }
        });
    }
    
    module.exports = {
        register,
        login
    }
