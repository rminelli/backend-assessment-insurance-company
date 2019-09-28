const auth = require("../middleware/auth");
const { User, validate } = require("../models/userModel.js")
const authLogin = require("../models/userModel.js")
const express = require("express");
const router = express.Router();

router.post('/',authLogin.userModel)

// router.get("/current", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

router.get("/current", auth)

module.exports = router;