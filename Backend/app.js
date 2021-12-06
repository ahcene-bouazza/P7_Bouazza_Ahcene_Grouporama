const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const cors = require('cors');
const helmet = require('helmet');


// importation des routes
const messageRoutes = require("./routes/messages");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/user"); 

const app = express();

// CORS : traitement des erreurs cross origins (middleware général, ajout des headers)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();                                                               
});

/*
app.listen('3000', ()=> {
    console.log('server started on port 3000')
});
*/

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet()); 

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentRoutes); 
  
app.use("/api/auth", userRoutes);  

module.exports = app;  