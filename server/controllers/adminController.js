const jwt = require('jsonwebtoken')
const RestaurantItem = require('../models/ItemModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const UserAttendance = require("../models/UserAttendance"); // Import UserAttendance model



exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const CreateUser = await User.create({
            name,
            email,
            password,
            userRole: 'admin'
        })
        res.status(200).json({ message: 'User created successfully', data: CreateUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving items', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid email or user does not exist." });
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials. Please try again." });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json({ error: "Your account is not verified." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.userRole }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1d" } // Token expiry
        );

        // Save the token to the user document
        user.token = token;
        await user.save();

        // Send the response
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userRole: user.userRole,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};


exports.addItem = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            inventoryCount,
            quality,
            discount,
            itemImage,
            foodType,
            category,
            foodSizeOrWeight,
        } = req.body;

        if (!name || !description || !price || !inventoryCount || !quality) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        const newItem = new RestaurantItem({
            name,
            description,
            price,
            discount: discount || 0,
            inventoryCount,
            quality,
            foodType,
            category,
            foodSizeOrWeight,
            itemImage: itemImage || null,
        });

        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item added successfully', data: savedItem });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the item', error: error.message });
    }
};

// Get all restaurant items
exports.getItem = async (req, res) => {
    try {
        const items = await RestaurantItem.find();
        res.status(200).json({ message: 'Items retrieved successfully', data: items });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving items', error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    const { itemId } = req.params;
    try {
        const items = await RestaurantItem.findOne({ _id: itemId });
        res.status(200).json({ message: 'Items retrieved successfully', data: items });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving items', error: error.message });
    }
};

// Delete a restaurant item by ID
exports.deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Item ID is required' });
        }

        const deletedItem = await RestaurantItem.findByIdAndDelete({ _id: itemId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully', data: deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the item', error: error.message });
    }
};

// Update a restaurant item by ID
exports.updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { ...formData } = req.body;

        if (!itemId) {
            return res.status(400).json({ message: 'Item ID is required' });
        }

        const updatedItem = await RestaurantItem.findByIdAndUpdate({ _id: itemId }, formData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the item', error: error.message });
    }
};

exports.getSuccessOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { paymentStatus: 'successful' },
                { paymentStatus: 'Cash' }
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching confirmed orders' });
    }
}

exports.markAttendance = async (req, res) => {
    const { userId } = req.body; // Assume `userId` is passed in the request body
    const currentTime = new Date();
    const loginHour = currentTime.getHours();
    const loginMinutes = currentTime.getMinutes();

    try {
        const user = await User.findById(userId);

        if (user && user.userRole === "admin") {
            const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

            // Check if attendance for today already exists
            const existingAttendance = user.userAttendance.find((att) =>
                new Date(att.date).toISOString().startsWith(today)
            );

            if (existingAttendance) {
                return res.status(400).json({ message: "Attendance already marked." });
            }

            // Mark as present if login is between 9:00 AM and 9:10 AM
            if (loginHour === 9 && loginMinutes <= 10) {
                user.userAttendance.push({ date: new Date(), status: "present" });
            } else {
                // Mark as absent by default
                user.userAttendance.push({ date: new Date(), status: "absent" });
            }

            await user.save();
            return res.status(200).json({ message: "Attendance marked successfully." });
        }

        res.status(404).json({ message: "User not found or not an admin." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.raiseAttendanceIssue = async (req, res) => {
    try {
        const { adminId, reason } = req.body;

        // Validate request body
        if (!adminId || !reason) {
            return res.status(400).json({ error: "adminId and reason are required" });
        }

        // Get today's date in ISO format (only date part)
        const today = new Date().toISOString().split("T")[0];

        // Check if today's attendance record already exists for the given user (adminId)
        let attendanceRecord = await UserAttendance.findOne({
            userId: adminId,
            date: { $gte: new Date(today), $lt: new Date(new Date(today).setDate(new Date(today).getDate() + 1)) },
        });

        if (!attendanceRecord)  {
            // If no attendance record exists for today, create a new one
            attendanceRecord = new UserAttendance({
                userId: adminId,
                date: new Date(),
                raiseIssue: reason,
                status: "issue",
            });
        }else{
            return res.status(200).json({ message: "issue raised already for today session.",attendanceRecord });
        }

        // Save the attendance record (whether new or updated)
        await attendanceRecord.save();

        return res.status(200).json({ message: "Attendance issue raised successfully.",attendanceRecord });
    } catch (error) {
        console.error("Error raising attendance issue:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const { adminId, attendanceId, status } = req.body;

        // Validate request body
        if (!adminId || !attendanceId || !status) {
            return res.status(400).json({ message: "Invalid input data. Please provide adminId, attendanceId, and status." });
        }

        // Find the admin (or user) by adminId
        const admin = await User.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Find the attendance record by attendanceId
        const attendanceRecord = await UserAttendance.findById(attendanceId);

        if (!attendanceRecord) {
            return res.status(404).json({ message: "Attendance record not found." });
        }

        // Check if the admin is the owner of the attendance record (if needed)
        if (attendanceRecord.userId.toString() !== adminId) {
            return res.status(403).json({ message: "You do not have permission to update this attendance record." });
        }

        // Update the status of the attendance record
        attendanceRecord.status = status;

        // Save the updated attendance record
        await attendanceRecord.save();

        return res.status(200).json({
            message: "Attendance updated successfully!",
            attendanceRecord,
        });
    } catch (error) {
        console.error("Error updating attendance:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

exports.getAttendanceByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Extract the logged-in user's ID from the request object
        const { adminId } = req.query; // Extract adminId from the query string, or use userId for the current user

        // Fetch the user's attendance records from the UserAttendance model
        const attendanceRecords = await UserAttendance.find({
            userId: adminId || userId, // Use adminId if provided, else use the logged-in user's ID
        }).sort({ date: -1 }); // Sort by date in descending order (latest attendance first)

        // Check if attendance records exist for the user
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this user." });
        }

        // Fetch the user's basic information (name, email, role) from the User model
        const user = await User.findById(adminId || userId).select("_id name email userRole");

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the user's attendance details along with basic information
        res.status(200).json({
            message: "Attendance fetched successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userRole: user.userRole,
                attendance: attendanceRecords, // Send the attendance records
            },
        });
    } catch (error) {
        console.error("Error fetching user attendance:", error);
        res.status(500).json({ error: "Server error while fetching attendance details." });
    }
};





