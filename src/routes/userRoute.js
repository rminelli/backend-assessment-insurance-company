const getLoginData = require("../models/userModel.js")
const getClientData = require('../models/clientsModel')
const getPoliciesData = require('../models/policiesModel.js')
const express = require("express");
const router = express.Router();

router.post('/',getLoginData.userModel)
router.get('/clients', getClientData.getClient)
router.get('/policies', getPoliciesData.getPolicies)

module.exports = router;