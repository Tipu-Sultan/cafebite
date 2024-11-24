const express = require("express");
const { addItem, getItem, deleteItem, updateItem, getItemById, getSuccessOrders,register, loginUser, updateAttendance, getAttendanceByUserId, markAttendance, raiseAttendanceIssue} = require("../controllers/adminController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(loginUser);
router.route('/item').post(auth(['admin','owner']),addItem);
router.route('/item').get(auth(['admin','owner']),getItem);
router.route('/item/:itemId').get(auth(['admin','owner']),getItemById).put(auth(['admin','owner']),updateItem).delete(auth(['admin','owner']),deleteItem);
router.get("/orders/confirmed",auth(['admin','owner']), getSuccessOrders);

router.get("/attendance/admins",auth(['admin','owner']),getAttendanceByUserId);
// Route for owner to update attendance
router.post("/attendance/mark", markAttendance);
router.post("/attendance/raise-issue", raiseAttendanceIssue);
router.patch("/attendance/update", updateAttendance);



module.exports = router;
