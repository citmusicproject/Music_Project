const userUtils = require("./login");
const mysql = require('mysql');
const key = require('./dbkeys.js');
var connection = mysql.createConnection({
    host: key.RDS_HOSTNAME,
    user: key.RDS_USERNAME,
    password: key.RDS_PASSWORD,
    port: key.RDS_PORT,
    database: key.RDS_DB_NAME
});

let nemail = `unittest${Math.round(Math.random() * 2147483647)}@gmail.com`;

test('Verify key file contains data', () => {
    expect(key.RDS_HOSTNAME).toBeDefined();
    expect(key.RDS_USERNAME).toBeDefined();
    expect(key.RDS_PASSWORD).toBeDefined();
    expect(key.RDS_PORT).toBeDefined();
    expect(key.RDS_DB_NAME).toBeDefined();
});

test('Connect to database', done => {
    function callback(err) {
        expect(err).toBe(null);
        done();
    }

    connection.connect(callback);
});

test('Try to register a user', () => {
    expect(userUtils.register({
        first: "firstname",
        last: "lastname",
        email: nemail,
        pw: "passwordut"
    })).not.toBe(false);
});

test('Try to register again', () => {
    expect(userUtils.register({
        first: "firstname",
        last: "lastname",
        email: nemail,
        pw: "passwordut"
    })).toBe(undefined);
});

test('Try login with wrong username', done => {
    function callback(ud, data) {
        expect(ud).toEqual("E");
        done();
    }

    userUtils.login({
        email: nemail + "_W",
        pw: "passwordutwrong"
    }, callback);
});

test('Test login with wrong password', done => {
    function callback(ud, data) {
        expect(ud).toEqual("P");
        done();
    }

    userUtils.login({
        email: nemail,
        pw: "passwordut" + "_W"
    }, callback);
});

test('Test login with correct password', done => {
    function callback(ud, data) {
        expect(ud).toEqual(undefined);
        done();
    }

    userUtils.login({
        email: nemail,
        pw: "passwordut"
    }, callback);
});