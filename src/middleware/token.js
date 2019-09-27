const jwt = require('jsonwebtoken');
const config = require('../config');

// route middleware to verify a token
module.exports = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // Decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      return next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
