import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import withAuth from "./WithAuth";
import SearchBar from "./components/SearchBar";
import useSearch from "../../hooks/useSearch";

const AllItems = () => {
  const { items } = useFetchData();
  const { searchQuery, setSearchQuery, filteredItems } = useSearch(items);


  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <h1 className="text-3xl font-bold text-gray-700 mb-6">All Items</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-4 text-sm font-medium text-gray-700">#</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Price</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Discount</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Stock</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems?.length > 0 ? (
                filteredItems?.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-4 text-sm text-gray-700 font-semibold">
                      {item.name}
                    </td>
                    <td className="p-4 text-sm text-gray-700">₹{item.price.toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-700">₹{item.discount}</td>
                    <td className="p-4 text-sm text-gray-700">{item.category}</td>
                    <td className="p-4 text-sm text-gray-700">{item.inventoryCount}</td>
                    <td className="p-4 text-sm">
                      <Link to={`update-item/${item._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">
                        Edit
                      </Link>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-red-600 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-4 text-sm text-gray-500"
                  >
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AllItems);
