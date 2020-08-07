const express = require('express');
const bcrypt = require('bcrypt');
var sql = require('mysql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Authenticator = require('../Auth/Auth.js').Authenticator;
var localStorage = null;
var router = express.Router();

router.use(express.json());

// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.MONGO_D_URI;  //"mongodb+srv://omgupta:<password>@demo-cluster.y6gyu.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
// client.connect(err => {
//   //const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('mongo');
//   client.close();
// });

// mongoose.connect(process.env.MONGO_D_URI, {
//   useNewUrlParser: true,  useUnifiedTopology: true
// });
const connection = sql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // Use your credentials (Username)
    password: process.env.DB_PASSWORD,// Use your credentials (Password)
    database: process.env.DB_NAME //Your DB Name
});
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

if (typeof localStorage === "undefined" || localStorage === null) {
  LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


router.post('/:username/:password/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.params.password, 10);
        var user = { username: req.params.username, hashedPassword};

    console.log(user);
    var sql = 'INSERT INTO users (username, password) values ("' + req.params.username  + '","' + hashedPassword + '")';
    // var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';

    connection.query(sql, (err,data) => {
        if(err) throw err;
        const user1 = { name: req.params.username };

        const accessToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET);

        localStorage.setItem('accessToken', accessToken.toString());
        res.json({
            message: 'Welcome ' + req.params.username,
            accessToken: accessToken
            });
        });
    }catch{
        res.send("Something went wrong");
    }
    
});

router.post('/:username/:password/login', async (req, res) => {
    var user = [];
    user = user.filter(n => n); 

    if(!req.params.username || !req.params.password)
    return res.status(400).send('Email & Password are required');
    var sql = 'SELECT * FROM users WHERE username = "' + req.params.username + '"';
    connection.query(sql ,(err, data) => {
      if (err) throw err;
      user = data;
      console.log(user);
      if (user.length == 0) {
        return res.send('Cannot find user');
      }
      try{
        bcrypt.compare(req.params.password, user[0].password).then((isMatched) => {
          if(isMatched){
            const user1 = { name: req.params.username };

            const accessToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET);
            localStorage.setItem('accessToken', accessToken.toString());
            res.json({
              message: 'Successfully Logged In as ' + user[0].username,
              accessToken: accessToken
            });
          }else{
            res.send('Wrong Credentials!');
          }
        }).catch(err => {
          res.status(500).send('Something went wrong');
        });      
      } catch {
        res.status(500).send('Something went wrong');
      }
    });//getUser(req.params.username);
    
});

router.get('/users', (req,res) => {
    connection.query('SELECT * FROM users', (err,rows) => {
        if(err) throw err;
        //console.log(rows);
        res.send(rows);
      });

});

async function getUser(username){
    var user = null;
    var sql = 'SELECT * FROM users WHERE username = "' + username + '"';
    // var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';
    console.log(sql);
    await connection.query(sql, (err,data) => {
        if(err) throw err;
        console.log(data);
        user = data;
    });

    return user;
}

module.exports.router = router;