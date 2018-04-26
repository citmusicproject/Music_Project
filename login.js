const fs = require('fs');
const db = require('./accdata.json')

var loadDatabase = ()=>{
    var accdata = JSON.stringify(db)
    var data = JSON.parse(accdata)
    return data
}   



module.exports = {
    loadDatabase
}