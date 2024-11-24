const express = require("express");
const { addItem, getItem, deleteItem, updateItem } = require("../controllers/itemController");
// const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

// router.use(auth(['admin']));
router.route('item').post(addItem).get(getItem).delete(deleteItem).get(updateItem);

module.exports = router;
