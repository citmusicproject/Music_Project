const userUtils = require("./login");
const db = require('./database.js')
require('dotenv').config();

let nemail = `unittest${Math.round(Math.random() * 2147483647)}@gmail.com`;

test('Verify key file contains data', () => {
    expect(process.env.RDS_HOSTNAME).toBeDefined();
    expect(process.env.RDS_USERNAME).toBeDefined();
    expect(process.env.RDS_PASSWORD).toBeDefined();
    expect(process.env.RDS_PORT).toBeDefined();
    expect(process.env.RDS_DB_NAME).toBeDefined();
});

test('Connect to database', done => {
    function callback(err) {
        expect(err).toBe(null);
        done();
    }

    db.connect(callback);
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