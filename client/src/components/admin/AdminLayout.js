import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import useUserData from "../../hooks/useAuthData";

const AdminLayout = ({ children }) => {
    const { storedUser, isAuthenticated, logout } = useUserData()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Top Navbar */}
            <header className="bg-blue-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
                <div className="flex items-center">
                    {/* Home Link */}
                    <Link to="/" className="text-xl font-bold hover:text-gray-300">Home</Link>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="text-white flex items-center hover:text-gray-300"
                            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle on click
                        >
                            <span className="mr-2">{storedUser ? storedUser.name : "Admin"}</span> {/* Display username */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/admin/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            onClick={logout}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to={'/admin/login'}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                    >
                                        Login
                                    </Link>
                                )
                                }
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu (Mobile) */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar userRole={storedUser?.userRole} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-0 md:ml-64 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
