const Order = require("../models/OrderModel");
const RestaurantItem = require("../models/ItemModel"); // Assuming RestaurantItem is the model for food items

exports.confirmOrder = async (req, res) => {
    const { userDetails, initialTotal, subtotal, total, gst, discount, orderId, receipt, paymentStatus, paymentId, paymentMethod, currency, items } = req.body;

    try {
        // Map over items to calculate final prices and update order details
        const totalItems = await Promise.all(items.map(async (item) => {
            // Find item details from RestaurantItem collection using the item ID
            const restaurantItem = await RestaurantItem.findById(item._id);
            if (!restaurantItem) {
                throw new Error(`Item with ID ${item._id} not found`);
            }

            const actualPrice = restaurantItem.price;
            const discount = item.discount || 0;
            const finalPrice = actualPrice - (actualPrice * discount) / 100;

            // Update stock quantity in RestaurantItem
            if (restaurantItem.stock < item.quantity) {
                throw new Error(`Not enough stock for ${item.name}`);
            }

            // Deduct the ordered quantity from the stock
            restaurantItem.inventoryCount -= item.quantity;
            await restaurantItem.save(); 

            return {
                itemId: item._id,
                itemName: item.name,
                actualPrice,
                discount,
                finalPrice,
                itemImage: item.itemImage,
                quantity: item.quantity,
            };
        }));

        // Create a new order
        const order = new Order({
            orderId,
            receipt,
            currency,
            userDetails,
            paymentId,
            paymentStatus,
            paymentMethod,
            totalItems,
            total,
            gst,
            initialTotal,
            subtotal,
            discount,
        });

        // Save the order to the database
        await order.save();

        res.status(201).json({ success: true, message: 'Order stored successfully!', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error storing order', error: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    const {orderId} = req.query;

    const order = await Order.findOne({receipt:orderId})
    if (!order) {
        return res.status(404).json({error: 'Order not found'});
    }
    return res.json({order});
}

