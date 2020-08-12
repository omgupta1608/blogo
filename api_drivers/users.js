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

mongoose.set('debug', true);

const _schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}, {
    collection: 'users'
});
const _users = mongoose.model('users', _schema);
mongoose.connect(process.env.MONGO_D_URI, {
    useNewUrlParser: true
}, () => {
  console.log("Connected!")
});

// if (typeof localStorage === "undefined" || localStorage === null) {
//   LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }


router.post('/:username/:password/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.params.password, 10);
        var user = { username: req.params.username, hashedPassword};

        console.log(user);
    //var sql = 'INSERT INTO users (username, password) values ("' + req.params.username  + '","' + hashedPassword + '")';
    // var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';

        var user = new _users({
          username: req.params.username,
          password: hashedPassword
        });

        user.save((err, data) => {
          if(err) throw err;
          console.log(data);

          const user1 = { name: req.params.username };
          const accessToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET);
          console.log(accessToken);
          res.json({
                message: 'Welcome ' + req.params.username,
                accessToken: accessToken
          });
        });

    // connection.query(sql, (err,data) => {
    //     if(err) throw err;
        

        
    //     localStorage.setItem('accessToken', accessToken.toString());
        
    //     });
    }catch{
        res.send("Something went wrong");
    }
    
});

router.post('/:username/:password/login', async (req, res) => {
    var user = [];
    user = user.filter(n => n); 

    if(!req.params.username || !req.params.password)
    return res.status(400).send('Email & Password are required');
    //var sql = 'SELECT * FROM users WHERE username = "' + req.params.username + '"';

    _users.findOne({
      username: req.params.username
    }).exec((err, data) => {
      if(err) throw err;
      user.push(data);
      console.log(user);

      if (user.length == 0) {
        return res.send('Cannot find user');
      }
      try{
        bcrypt.compare(req.params.password, user[0].password).then((isMatched) => {
          if(isMatched){
            const user1 = { name: req.params.username };

            const accessToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET);
            //localStorage.setItem('accessToken', accessToken.toString());
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

    });
});

router.get('/users', (req,res) => {
    
    _users.find({}, (err,data) => {
      if(err) throw err;
      res.send(data);
    });

});

module.exports.router = router;