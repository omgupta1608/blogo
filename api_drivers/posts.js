var express = require('express');
var multer = require('multer');
const helpers = require('../helpers/upload_helper');
const dotenv = require('dotenv').config();
const Authenticator = require('../Auth/Auth.js').Authenticator;


var router = express.Router();

var sql = require('mysql');

const upload = multer({dest:'public/uploads/'});

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
  
router.get('/all_posts', Authenticator,  (req,res) => {
    connection.query('SELECT * FROM posts', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
     });
});



router.post('/:id/like_post', (req, res) => {
    var post_id = req.params.id;


    var sql = 'UPDATE posts SET likes_count = likes_count + 1 WHERE post_id = ' + post_id;

    connection.query(sql, (err, data) => {
        if(err) throw err;

        res.send({
            res_code: 200,
            res_data: data
        });
    });
});

router.post('/:content/:date', upload.single('post_image'), (req, res) => {
    var content = req.params.content;
    var date = req.params.date;
    var likes = 0;
    var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + req.file.filename + '")';
    // var sql = 'INSERT INTO posts (date_time,content,likes_count,imageUrl) values ("' + date + '","' + content + '",' + likes + ',"' + path + '")';

    connection.query(sql, (err,data) => {
        if(err) throw err;
        res.send({
            res_code: 200,
            res_data: data
        });
      });
      
});

// router.post('/upload_image' ,(req, res) => {
//     let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

//     upload(req, res, function(err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an image to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }

//         // Display uploaded image for user validation
//         res.send({
//             code: 200,
//             filePath: req.file.path
//         });
//     });
// });


module.exports.router = router;