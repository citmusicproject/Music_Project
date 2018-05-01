const fs = require('fs');
const db = require('./accdata.json')

var loadDatabase = () => {
    var accdata = JSON.stringify(db)
    var data = JSON.parse(accdata)
    return data
}

var addUser = (accdata) => {
    var valid = true
    console.log("accountdata:", accdata)
    fs.writeFile('accdata.json', JSON.stringify(accdata), (error) => {
        if (error) {
            valid = false
        }
    });
    return valid
}


module.exports = {
    loadDatabase,
    addUser
}