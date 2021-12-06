const mysql = require('mysql');

// configuration du fichier .env
require('dotenv').config();

// connection to mysql database 
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    /*database : 'test'*/
});

/* // connection console 
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
}); */

// test creation et connexion
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    db.query("CREATE DATABASE IF NOT EXISTS test", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    });

    db.query("USE test", function (err, result) {
    if (err) throw err;
    console.log("using created database");
    });

    db.query(
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, pseudo varchar(55) DEFAULT NULL, email varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, profilPic varchar(255) DEFAULT NULL, isAdmin tinyint(1) NOT NULL DEFAULT '0', isActive tinyint(1) NOT NULL DEFAULT '1')", function (err, result) {
    if (err) throw err;
    console.log("users table created");
    });

    db.query(
    "CREATE TABLE IF NOT EXISTS messages (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INTEGER NOT NULL, content text NOT NULL, image varchar(255) DEFAULT NULL, createdAt datetime NOT NULL, updatedAt datetime NOT NULL, isActive tinyint(1) NOT NULL DEFAULT '1')", function (err, result) {
    if (err) throw err;
    console.log("messages table created");
    });

    db.query(
    "ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES users (id)", function (err, result) {
    if (err) throw err;
    console.log("joining messages_user_id id to users id");
    });

    db.query(
    "CREATE TABLE IF NOT EXISTS comments (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INTEGER NOT NULL, message_id INTEGER NOT NULL, comment text NOT NULL, createdAt datetime NOT NULL, updatedAt datetime NOT NULL)", function (err, result) {
    if (err) throw err;
    console.log("comments table created"); 
    });

    db.query(
    "ALTER TABLE comments ADD FOREIGN KEY (message_id) REFERENCES messages (id)", function (err, result) {
    if (err) throw err;
    console.log("joining comments_message_id id to messages id");
    });

    db.query(
    "ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users (id)", function (err, result) {
    if (err) throw err;
    console.log("joining comments_user_id id to users id");
    });

    db.query(
    "CREATE TABLE IF NOT EXISTS reaction_type_id (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, reaction varchar(45) NOT NULL)", function (err, result) {
    if (err) throw err;
    console.log("reaction_type_id table created");
    });

    db.query(
    "CREATE TABLE IF NOT EXISTS message_reaction_user (user_id int NOT NULL, message_id int NOT NULL, reaction_id int NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (reaction_id) REFERENCES reaction_type_id (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (user_id, message_id, reaction_id))", function (err, result) {
    if (err) throw err;
    console.log("message_reaction_user table created");
    });

});

// exportation du fichier config to app
module.exports = db;