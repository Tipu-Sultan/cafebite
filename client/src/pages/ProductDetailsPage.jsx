import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { addItem } from '../redux/slices/cartSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartCount from '../components/cart/cartCount';

const ProductDetailsPage = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.menu);
    const item = items.find((item) => item._id === itemId);
    const {
        name,
        description,
        price,
        discount,
        inventoryCount,
        quality,
        foodType,
        category,
        foodSizeOrWeight,
        itemImage,
        galleryImages = ['https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/478728a.jpg?ts=1690814280',
            'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/478728a.jpg?ts=1690814280',
            'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/478728a.jpg?ts=1690814280',
            'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/478728a.jpg?ts=1690814280',
            'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/478728a.jpg?ts=1690814280'
        ], // Assuming there are gallery images
    } = item;
    const [selectedImage, setSelectedImage] = useState(itemImage); // State to hold selected image

    // Get the cart items from Redux store
    const cartItems = useSelector((state) => state.cart.items);

    // Check if the item is already in the cart
    const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (!item) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }
    

    const discountedPrice = discount
        ? price - (price * discount) / 100
        : price;

    const handleAddToCart = () => {
        dispatch(addItem({ ...item, quantity: 1 }));
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Update top image on gallery image click
    };
    

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                {/* Product Card */}
                <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
                    {/* Product Image and Gallery Slider */}
                    <div className="flex flex-col md:flex-row">
                        {/* Top Image */}
                        <div className="md:w-1/2 flex justify-center">
                            <img
                                src={selectedImage || 'https://via.placeholder.com/300'}
                                alt={name}
                                className="rounded-lg w-full max-w-md"
                            />
                        </div>

                        {/* Gallery Slider (Bottom) */}
                        <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => setSelectedImage(galleryImages[0])}
                                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                                >
                                    {'<'}
                                </button>
                                <div className="flex gap-2 overflow-x-auto">
                                    {galleryImages.length > 0 && (
                                        galleryImages.map((image, index) => (
                                            <div key={index} className="overflow-hidden">
                                                <img
                                                    src={image || 'https://via.placeholder.com/100'}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="object-cover w-24 h-24 rounded-md hover:opacity-75 cursor-pointer"
                                                    onClick={() => handleImageClick(image)} // Update selected image on click
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button
                                    onClick={() => setSelectedImage(galleryImages[galleryImages.length - 1])}
                                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8">
                        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                        <p className="mt-2 text-gray-600">{description}</p>

                        {/* Price */}
                        <div className="mt-4">
                            {discount > 0 ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl font-bold text-green-500">
                                        ₹{discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm line-through text-gray-500">
                                        ₹{price.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-red-500">
                                        {discount}% Off
                                    </span>
                                </div>
                            ) : (
                                <span className="text-xl font-bold text-gray-800">
                                    ₹{price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Inventory and Quality */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Quality:</span> {quality}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">In Stock:</span>{' '}
                                {inventoryCount > 0 ? inventoryCount : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Category:</span> {category}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Type:</span> {foodType}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Size/Weight:</span>{' '}
                                {foodSizeOrWeight}
                            </p>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-6 flex space-x-4">
                            <div className="mt-4 w-full">
                                {cartItem ? (
                                    <div className="flex justify-center items-center">
                                        <CartCount item={cartItem} />
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full font-semibold border border-green-300 text-green-600 py-2 rounded-md hover:bg-green-50"
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200">
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailsPage;
