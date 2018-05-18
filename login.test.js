const lgin = require("./login");
const mysql = require('mysql');
const key = require('./dbkeys.js');
var connection = mysql.createConnection({
    host: key.RDS_HOSTNAME,
    user: key.RDS_USERNAME,
    password: key.RDS_PASSWORD,
    port: key.RDS_PORT,
    database: key.RDS_DB_NAME
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

test('Test login with correct password', done => {
    function callback(ud, data) {
        expect(data.length).not.toEqual(1);
        done();
    }
    lgin.login({ email: "Alexphan1099@gmail.com", pw: "habbo101"}, callback);
});

// test('Test login with wrong password', done => {
//     function callback(ud, data) {
//         expect(data.length).not.toEqual(1);
//         done();
//     }
//     lgin.login({ email: "unittest@gmail.com", pw: "pass"}, callback);
// });


// Register do not return anything or use callback
test('Test if console.log is called', () => {
    lgin.register({first: "firstname", last: "lastname", email: "unittest1@gmail.com", pw: "passwordut"}).expect(console.log('Successful')).toBeCalled();
});