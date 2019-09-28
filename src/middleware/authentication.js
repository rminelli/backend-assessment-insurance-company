const jwt = require("jsonwebtoken");
const config = require('../config/config.js');

exports.getToken = function name(data) {
  let token = jwt.sign({ data }, config.myprivatekey, { expiresIn: 3000 })
  return token
}

exports.checkToken = function (data) {  
  const token = data
  if (!token) {
    return (
      {
        "status": false,
        "msg": "Access denied. No token provided"
      }
    )
  }
  try {
    //Verify the token
    const decoded = jwt.verify(token, config.myprivatekey);
    return (
      {
        "status": true,
        "msg": "Access Granted.",
        "decoded" : decoded
      }
    )
  }
  catch (err) {
    //If token is invalid
    return (
      {
        "status": false,
        "msg": "Invalid token."
      }
    )
  }
};

