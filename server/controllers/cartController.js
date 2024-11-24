const RestaurantItem = require('../models/restaurantItem');

// Add a new restaurant item
exports.addCart= async (req, res) => {
  try {
    const { name, description, price, discount, inventoryCount, quality, itemImage } = req.body;

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
      itemImage: itemImage || null,
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Item added successfully', data: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the item', error: error.message });
  }
};

// Get all restaurant items
exports.getCart= async (req, res) => {
  try {
    const items = await RestaurantItem.find();
    res.status(200).json({ message: 'Items retrieved successfully', data: items });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving items', error: error.message });
  }
};

// Delete a restaurant item by ID
exports.deleteCart= async (req, res) => {
  try {
    const { id } = req.body; // Assuming ID is passed in the request body

    if (!id) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const deletedItem = await RestaurantItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the item', error: error.message });
  }
};

// Update a restaurant item by ID
exports.updateCart= async (req, res) => {
  try {
    const { id, ...updates } = req.body; 

    if (!id) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const updatedItem = await RestaurantItem.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the item', error: error.message });
  }
};


