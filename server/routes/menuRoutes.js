const express = require("express");
const { getMenu } = require("../controllers/menuController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.route('/item').get(auth(['admin']),getMenu);

module.exports = router;
