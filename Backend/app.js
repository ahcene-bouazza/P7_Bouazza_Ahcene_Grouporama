const express = require("express");
const mysql = require('mysql');

// connection to mysql database 
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MySQL2021',
    database : 'groupomania'
});


// connect db

db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// create DB
app.get('/createdb', (req, res)=> {
    let sql  = 'CREATE DATABASE groupomania';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

// create table
app.get('/createpoststable', (req, res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, res)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert a post
app.get('/addpost', (req, res)=>{
    let post = {title: 'post one', body:'this is post one'};
    let sql ='INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post one added...');
    });
});

// selectionner 
app.get('/getposts', (req, res)=>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send(' posts selectionnés');
    });
});


app.listen('3000', ()=> {
    console.log('server started on port 3000')
});
