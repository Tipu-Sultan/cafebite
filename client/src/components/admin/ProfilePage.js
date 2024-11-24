import React from "react";
import useUserData from "../../hooks/useAuthData";
import AdminLayout from "./AdminLayout";
import withAuth from "./WithAuth";

const ProfilePage = () => {
  const { storedUser, logout } = useUserData();

  if (!storedUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-red-500">User not found</h1>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-600 font-medium">Name:</h3>
              <p className="text-gray-800">{storedUser.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Email:</h3>
              <p className="text-gray-800">{storedUser.email || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Role:</h3>
              <p className="text-gray-800">{storedUser.userRole || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Phone:</h3>
              <p className="text-gray-800">{storedUser.phone || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Address:</h3>
              <p className="text-gray-800">{storedUser.address || "N/A"}</p>
            </div>
            {/* Add additional fields as necessary */}
          </div>
          <button
            onClick={logout}
            className="mt-6 w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(ProfilePage,['admin','owner']);
