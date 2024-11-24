const mongoose = require('mongoose');

const restaurantItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0, 
    min: 0,
    max: 100,
  },
  inventoryCount: {
    type: Number,
    required: true,
    min: 0,
  },
  quality: {
    type: String,
    enum: ['Low', 'Medium', 'High'], 
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  foodSizeOrWeight: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String, // URL or path to the image
    default: null,
  },
  media: {
    photos: [String], 
    videos: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }
);

// Middleware to update `updatedAt` before saving
restaurantItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const RestaurantItem = mongoose.model('RestaurantItem', restaurantItemSchema);

module.exports = RestaurantItem;
