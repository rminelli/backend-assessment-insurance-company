const jwt = require("jsonwebtoken");
const config = require('../config/config.js');

module.exports = function (req, res, next) {
  const _token = req.headers.token
  const _name = req.headers.name
  
  if (!_token) {
    return res.status(401).send("Access denied. No token provided.")
  }
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(_token, config.myprivatekey);
    console.log(decoded)
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

