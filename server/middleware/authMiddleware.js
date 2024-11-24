require("dotenv").config();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


// Middleware to verify user authentication and role authorization
exports.auth = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      // Extract the token from Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user payload to the request object

      // Fetch the user from the database
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }


      // Check if the user has one of the required roles (if roles are specified)
      if (requiredRoles.length > 0 && !requiredRoles.includes(user?.userRole)) {
        return res.status(401).json({ error: 'Access denied. Insufficient privileges.' });
      }

      // If valid, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      return res.status(401).json({ error: 'Invalid token. Authentication failed.' });
    }
  };
};
