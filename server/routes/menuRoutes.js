const express = require("express");
const { getMenu } = require("../controllers/menuController");
// const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.route('/item').get(getMenu);

module.exports = router;
