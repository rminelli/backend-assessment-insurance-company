const jwt = require("jsonwebtoken");
const config = require('../../.env');

exports.getToken = function name(data) {
  let token = jwt.sign({ data }, config.myprivatekey, { expiresIn: 300 })
  return token
}

exports.checkToken = function (data) {
  const token = data
  if (!token) {
    return (
      {
        "status": false,
        "msg": "Access denied. No token provided",
        "decoded" : {"data" : {"role" : false }}
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
        "decoded": decoded
      }
    )
  }
  catch (err) {
    //If token is invalid
    return (
      {
        "status": false,
        "msg": "Invalid token.",
        "decoded" : {"data" : {"role" : false }}
      }
    )
  }
};

