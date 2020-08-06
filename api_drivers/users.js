const express = require('express');
const bcrypt = require('bcrypt');
var sql = require('mysql');

var router = express.Router();

router.use(express.json());

const connection = sql.createConnection({
    host: 'localhost',
    user: 'om', // Use your credentials (Username)
    password: 'omgupta1608',// Use your credentials (Password)
    database: 'blogo_db' //Your DB Name
});
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


router.post('/:username/:password/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.params.password, 10);
        var user = { username: req.params.username, hashedPassword};

    console.log(user);
    var sql = 'INSERT INTO users (username, password) values ("' + req.params.username  + '","' + hashedPassword + '")';
    // var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';

    connection.query(sql, (err,data) => {
        if(err) throw err;
        res.send({
            res_code: 201,
            res_data: data
        });
    });
    }catch{
        res.status(500).send();
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
            res.send('Successfully Logged In');
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