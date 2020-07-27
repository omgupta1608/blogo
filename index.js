const express = require('express');

const app = express();


app.use(express.static('public/'));

var posts = require('./api_drivers/posts').router;

app.use('/api/posts/',posts);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/addPost', (req, res) => {
    res.sendFile(__dirname + '/views/addPost.html');
});


var PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server Started!"));