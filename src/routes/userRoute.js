const authentication = require("../middleware/authentication");
const getLoginData = require("../models/userModel.js")
const getClientData = require('../models/clientsModel')
const express = require("express");
const router = express.Router();

router.post('/',getLoginData.userModel)
router.get('/clients', getClientData.getClient)
//router.get('/policies', authentication.checkData)

module.exports = router;