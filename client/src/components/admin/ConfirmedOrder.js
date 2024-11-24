import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfirmedOrders } from '../../redux/slices/adminSlice';
import AdminLayout from './AdminLayout';
import withAuth from './WithAuth';
import SearchBar from './components/SearchBar';
import useSearch from '../../hooks/useSearch';

const ConfirmedOrder = () => {
    const dispatch = useDispatch();
    const { confirmedOrders, loading, error } = useSelector((state) => state.admin);
    const { searchQuery, setSearchQuery, filteredItems } = useSearch(confirmedOrders);

    // Fetch confirmed orders when component mounts
    useEffect(() => {
        dispatch(fetchConfirmedOrders());
    }, [dispatch]);

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Confirmed Orders</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 font-semibold py-6">
                            Error loading orders: {error}
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center text-gray-600 font-medium py-6">
                            No confirmed orders found.
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {filteredItems?.slice()?.reverse()?.map((order) => (
                                <div
                                    key={order.receipt}
                                    className="border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50"
                                >
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                        Order ID: {order.receipt} | Total: ₹{order.total.toFixed(2)}
                                    </h3>
                                    <table className="table-auto w-full border-collapse border border-gray-300">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                                                    Image
                                                </th>
                                                <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                                                    Item Name
                                                </th>
                                                <th className="px-4 py-2 border border-gray-300 text-center font-semibold text-gray-700">
                                                    Quantity
                                                </th>
                                                <th className="px-4 py-2 border border-gray-300 text-right font-semibold text-gray-700">
                                                    Final Price (₹)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.totalItems.map((item, index) => (
                                                <tr
                                                    key={item.itemId}
                                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                                >
                                                    <td className="px-4 py-2 border border-gray-300">
                                                        <img
                                                            src={item.itemImage}
                                                            alt={item.itemName}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300 text-gray-600">
                                                        {item.itemName}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300 text-center text-gray-600">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300 text-right text-green-600 font-semibold">
                                                        {item.finalPrice.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="mt-4 text-sm text-gray-500">
                                        Payment Method: <span className="font-medium">{order.paymentMethod}</span> |{' '}
                                        Payment Status: <span className="font-medium text-green-600">{order.paymentStatus}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Ordered By: {order.userDetails.name} ({order.userDetails.phone})
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Order Date: {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default withAuth(ConfirmedOrder);
