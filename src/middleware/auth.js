const jwt = require("jsonwebtoken");
const config = require('../config/config.js');

module.exports = function(req, res, next) {    
   

  const token = req.headers["x-access-token"]
  const name = req.headers["name"]
  const email = req.headers["email"]
  
  if (!token ) {
    return res.status(401).send("Access denied. No token provided.")
  } 

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.myprivatekey);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

