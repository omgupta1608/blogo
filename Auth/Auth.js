const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token == null) return res.json({
    message: 'Access Denied!'
  });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.json({
      message: 'Some error! Please Sign In again'
    });
    req.user = user;
    next();
  });
}

module.exports.Authenticator = authenticateToken;