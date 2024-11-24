const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",auth(['admin','owner']), getUser);


module.exports = router;
