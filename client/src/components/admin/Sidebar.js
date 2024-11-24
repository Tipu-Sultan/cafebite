import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, userRole }) => {
    return (
        <div className="relative min-h-screen">
            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden p-4 bg-blue-700 text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "Close" : "Menu"}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 bg-blue-700 text-white w-64 h-full z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300`}
            >
                <h2 className="text-2xl font-bold p-4 border-b border-blue-600">
                    Admin Panel
                </h2>
                <nav className="mt-4 space-y-4">
                    {/* Links accessible to both admin and owner */}
                    {["admin", "owner"].includes(userRole) && (
                        <>
                            <Link
                                to="/admin"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Dashboard
                            </Link>
                            {userRole === "admin" && (
                            <Link
                                to="/admin/add-item"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Add New Item
                            </Link>
                            )}
                            <Link
                                to="/admin/all-items"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                All Items
                            </Link>
                            <Link
                                to="/admin/orders"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Orders
                            </Link>
                            {userRole === "admin" && (
                            <Link
                                to="/admin/attendance"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Attendance
                            </Link>
                            )}
                        </>
                    )}
                    {/* Links accessible to the owner */}
                    {userRole === "owner" && (
                        <>
                            <Link
                                to="/admin/income"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Total Income
                            </Link>
                            <Link
                                to="/owner/users"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Users
                            </Link>
                        </>
                    )}
                    <Link
                        to="/"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                        Client Page
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
