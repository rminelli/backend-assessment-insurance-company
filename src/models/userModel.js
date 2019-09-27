const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//const mongoose = require('mongoose');

//simple schema
const UserSchema = {
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
};


//custom method to generate authToken 
generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.email }, config.myprivatekey); //get the private key from the config file -> environment variable
  return token;
}

const User = UserSchema

//function to validate user 
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;