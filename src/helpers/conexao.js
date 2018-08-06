const db = require('mysql');

let con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"teste"
    
});

module.exports = con;
