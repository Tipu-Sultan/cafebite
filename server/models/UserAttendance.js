const mongoose = require("mongoose");

const userAttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure this field is always populated with a valid user ID
    },
    date: {
      type: Date,
      required: true,
    },
    raiseIssue: {
      type: String,
    },
    status: {
      type: String,
      enum: ["present", "absent", "issue"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(), // Automatically set when created
    },
    updatedAt: {
      type: Date, // Update this manually during edits
    },
  },
  {
    timestamps: true, // Disable automatic createdAt/updatedAt fields for this schema
  }
);

module.exports = mongoose.model("UserAttendance", userAttendanceSchema);
