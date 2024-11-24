import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../../redux/slices/adminSlice';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, message, isLoading } = useSelector((state) => state.admin)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!email || !password) {
      dispatch(setError("All fields are required"));
      return;
    }
  
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/admin"); 
    } catch (err) {
      console.error("Login failed:", err); // Debugging
      dispatch(setError(err || "Something went wrong. Please try again."));
    }
  };
  

  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          {error && (
            <p className="p-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
              {error}
            </p>
          )}

          {message && (
            <p className="p-2 text-sm text-grey-700 bg-green-100 border border-green-300 rounded-md">
              {message}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600 ${isLoading === 'adminLogin' ? 'cursor-not-allowed opacity-50' : ''
                }`}
              disabled={isLoading === 'adminLogin'}
            >
              {isLoading === 'adminLogin' ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/admin/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Login;
