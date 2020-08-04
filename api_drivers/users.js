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
    const user = await getUser(req.params.username);
    console.log(user);
    if (user == null) {
      return res.status(400).send('Cannot find user');
    }
    try {
      if(await bcrypt.compare(req.params.password, user.password)) {
        res.send('Success');
      } else {
        res.send('Not Allowed');
      }
    } catch {
      res.status(500).send();
    }
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