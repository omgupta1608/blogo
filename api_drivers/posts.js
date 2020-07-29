var express = require('express');
var multer = require('multer');
const helpers = require('../helpers/upload_helper');

var router = express.Router();

var sql = require('mysql');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

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

router.post('/:content/:date/:path', (req, res) => {
    var content = req.params.content;
    var date = req.params.date;
    var likes = 0;
    var path = req.params.path;
    var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';

    connection.query(sql, (err,data) => {
        if(err) throw err;
        res.send({
            res_code: 200,
            res_data: data
        })
      });
      
})

router.post('/upload_image' ,(req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send({
            code: 200,
            filePath: req.file.path
        });
    });
});

module.exports.router = router;