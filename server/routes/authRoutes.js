const express = require("express");
const { register, login, getUser, index } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",auth(['admin','owner']), getUser);
router.post("/index", index);


module.exports = router;
