const express = require('express');

const app = express();


app.use(express.static('public/'));


var posts = require('./api_drivers/posts').router;
var users = require('./api_drivers/users').router;

app.use('/api/posts/',posts);
app.use('/api/users/',users);


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/intro.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', (req,res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

app.get('/homepage', (req, res) => {
    res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/addPost', (req, res) => {
    res.sendFile(__dirname + '/views/addPost.html');
});


var PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server Started!"));