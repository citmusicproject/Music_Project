const fs = require('fs');
const db = require('./accdata.json')

var loadDatabase = ()=>{
    var accdata = JSON.stringify(db)
    var data = JSON.parse(accdata)
    return data
}   

var addUser = (accdata)=>{
    fs.writeFile('accdata.json', JSON.stringify(accdata), (error) =>{
        console.log(error)
    });
}


module.exports = {
    loadDatabase,
    addUser
}