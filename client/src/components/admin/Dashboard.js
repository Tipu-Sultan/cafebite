import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import withAuth from "./WithAuth";

const Dashboard = () => {
  const { items,insights} = useFetchData();

  
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Admin Dashboard</h1>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add New Item */}
          <Link
            to="/admin/add-item"
            className="bg-white p-6 shadow-md rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">Add New Item</h2>
            <p className="text-gray-600 mt-2">Create a new menu item for the restaurant.</p>
          </Link>

          {/* Take Order */}
          <Link
            to="/admin/take-order"
            className="bg-white p-6 shadow-md rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">Take Order</h2>
            <p className="text-gray-600 mt-2">Process a customer order and generate the bill.</p>
          </Link>

          {/* All Items */}
          <Link
            to="/admin/all-items"
            className="bg-white p-6 shadow-md rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">All Items</h2>
            <p className="text-gray-600 mt-2">View, edit, or remove menu items.</p>
          </Link>

          {/* Total Income */}
          <Link
            to="/admin/income"
            className="bg-white p-6 shadow-md rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">Total Income</h2>
            <p className="text-gray-600 mt-2">Check the total revenue for the day or month.</p>
          </Link>

          {/* Orders */}
          <Link
            to="/admin/orders"
            className="bg-white p-6 shadow-md rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">Orders</h2>
            <p className="text-gray-600 mt-2">View pending and confirmed orders.</p>
          </Link>
        </div>

        {/* Metrics Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Items */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{items?.length}</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {/* {orders.filter((order) => order.status === "pending").length} */}
            </p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹ {insights?.totalRevenue?.toFixed(2)}</p>
          </div>

          {/* Daily Revenue */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Daily Revenue</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹ {insights?.dailyRevenue?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(Dashboard,['admin','owner']);
