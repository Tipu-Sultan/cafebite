import React from "react";
import { Navigate } from "react-router-dom";
import useUserData from "../../hooks/useAuthData";

function withAuth(Component, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const token = localStorage.getItem("token"); // Example token check
    const { storedUser } = useUserData()
    if (!token) {
      // If no token, redirect to login
      return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(storedUser?.userRole)) {
      // If the user's role is not in the list of allowed roles, redirect to a "not authorized" page
      return <Navigate to="/not-authorized" replace />;
    }

    // If authenticated and role is authorized, render the component
    return <Component {...props} />;
  };
}

export default withAuth;
