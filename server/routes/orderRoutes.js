const express = require("express");
const { confirmOrder, getOrderDetails } = require("../controllers/orderController");
// const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

// router.use(auth(['admin']))
router.post("/save", confirmOrder);
router.get("/fetch", getOrderDetails);



  

module.exports = router;
