const db = require('mysql');

let con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "37743417a",
    database:"teste"
    
});

module.exports = con;