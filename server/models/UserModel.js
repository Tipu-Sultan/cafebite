const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserAttendance = require("../models/UserAttendance"); // Import the new UserAttendance schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalOrdersLast24hrs: {
      type: Number,
      default: 0,
    }, // Total orders made by admin in the last 24 hours
    commissions: {
      type: Number,
      default: 0.0,
    }, // Commission earned by admin
    isVerified: {
      type: Boolean,
      default: false,
    }, // Indicates if the user is verified
    token: {
      type: String,
      default: null,
    }, // Authentication token for user
    profileImage: {
      type: String,
      default: null,
    }, // URL or path for profile image
    userRole: {
      type: String,
      enum: ["admin", "owner", "csr"],
      required: true,
      default: "admin",
    },
    // Reference to the new attendance schema
    userAttendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAttendance",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt for the User schema
  }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", userSchema);
