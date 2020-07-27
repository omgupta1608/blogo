var express = require('express');

var router = express.Router();

var sql = require('mysql');

const connection = sql.createConnection({
    host: 'localhost',
    user: 'om',
    password: 'omgupta1608',
    database: 'blogo_db'
});
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});
  
router.get('/all_posts', (req,res) => {
    connection.query('SELECT * FROM posts', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
      });

});

module.exports.router = router;