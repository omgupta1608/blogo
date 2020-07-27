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

router.post('/:content/:date', (req, res) => {
    var content = req.params.content;
    var date = req.params.date;
    var likes = 0;
    var sql = 'INSERT INTO posts (date_time,content,likes_count) values ("' + date + '","' + content + '",' + likes + ')';

    connection.query(sql, (err,data) => {
        if(err) throw err;
        res.send({
            res_code: 200,
            res_data: data
        })
      });
      
})

module.exports.router = router;