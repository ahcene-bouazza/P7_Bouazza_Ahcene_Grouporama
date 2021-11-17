const mysql = require('mysql');

// configuration du fichier .env
require('dotenv').config();

// connection to mysql database 
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'groupomania'
});

// connection console
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// exportation du fichier config to app
module.exports = db;