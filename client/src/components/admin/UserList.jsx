import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import withAuth from "./WithAuth";
import AdminLayout from "./AdminLayout";

const UserList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the list of all admins
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await api.get("/auth/user"); // Replace with your API endpoint
                setAdmins(response.data.user);
            } catch (error) {
                console.error("Error fetching admins:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    return (
        <AdminLayout>
            <div className="p-4 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-center mb-6">Admin List</h1>

                {loading ? (
                    <p className="text-center">Loading admins...</p>
                ) : admins.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Role</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{admin.name}</td>
                                        <td className="px-4 py-2 border">{admin.email}</td>
                                        <td className="px-4 py-2 border">{admin.userRole}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <Link
                                                to={`/admin/attendance/${admin._id}`}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                View Attendance
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center">No admins found.</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default withAuth(UserList, ['owner']);
