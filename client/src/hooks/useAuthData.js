import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useUserData = () => {
  // Get user from Redux state
  const { user: reduxUser } = useSelector((state) => state.admin);
  
  // Parse user from localStorage if Redux state is undefined
  const storedUser = reduxUser || JSON.parse(localStorage.getItem("user"));

  // State variables to track authentication and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (storedUser) {
      setIsAuthenticated(true); 
      setIsAdmin(storedUser?.userRole === "admin"); 
    } else {
      setIsAuthenticated(false); 
      setIsAdmin(false); 
    }
  }, [storedUser]); 

  // Log out function to clear localStorage and reset state
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.href = "/admin/login"; 
  };

  return { storedUser, isAuthenticated, isAdmin, logout };
};

export default useUserData;
