var express = require('express');
var multer = require('multer');
const helpers = require('../helpers/upload_helper');
const dotenv = require('dotenv').config();
const Authenticator = require('../Auth/Auth.js').Authenticator;
const mongoose = require('mongoose');

var router = express.Router();

var sql = require('mysql');

const upload = multer({dest:'public/uploads/'});

mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
const _schema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes_count: Number,
    date: String,
    imageUrl: String

}, {
    collection: 'posts'
});
const _posts = mongoose.model('posts', _schema);
mongoose.connect(process.env.MONGO_D_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
  console.log("Connected!")
});

  
router.get('/all_posts', (req,res) => {
    _posts.find({},'content likes_count imageUrl _id date').exec((err, data) => {
        if(err) throw err;
        console.log(data);
        res.send(data);
    });
});



router.post('/:id/like_post', (req, res) => {
    var post_id = req.params.id;

    _posts.findOneAndUpdate({
        _id: post_id
    }, {
        $inc: { likes_count: 1 }
    }).exec((err,data) => {
        if(err) throw err;
        console.log(data);
        res.send({
            res_code: 200,
            res_data: data
        });
    });
});

router.post('/:content/:date', upload.single('post_image'), (req, res) => {

    var post = new _posts({
        content: req.params.content,
        likes_count: 0,
        date: req.params.date,
        imageUrl: req.file.filename
    });

    post.save((err, post) => {
        if(err) throw err;
        console.log('Posted!');
        res.send({
            res_code: 200,
            res_data: post
        });
    })

      
});

module.exports.router = router;