import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import cafebite from '../../assests/cafebite.png'

const Navbar = () => {
  const { items, subtotal, cartCount } = useSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative shadow-md">
      {/* Logo */}
      <Link to="/" >
    <img 
        src={cafebite} 
        alt='cafebite' 
        width={62}
        height={10}
    />
</Link>


      {/* Desktop Navbar Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link
          to="/cart"
          className="flex items-center bg-green-500 px-4 py-3 font-semibold rounded-md hover:text-white transition duration-300"
          style={{ width: "120px", height: "50px" }} /* Fixed dimensions */
        >
          {/* First Column: Cart Icon */}
          <div className="mr-4">
            <FaShoppingCart size={24} />
          </div>

          {/* Second Column: Two rows with cartCount and subtotal */}
          <div className="flex flex-col">
            <span className="truncate">
              {items.length > 0
                ? `${cartCount} items`
                : `Cart (${items.length})`}
            </span>
            <span className="text-md font-normal">
              {items.length > 0 && subtotal}
            </span>
          </div>
        </Link>




        <Link to="/admin" className="hover:text-yellow-400 transition duration-300">Admin</Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? (
            <FaTimes size={30} />
          ) : (
            <FaBars size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-blue-600 text-white p-6 flex flex-col space-y-4 animate__animated animate__fadeIn z-40">
          <Link
            to="/cart"
            className="flex items-center bg-green-500 px-4 py-3 font-semibold rounded-md hover:text-white transition duration-300"
            style={{ width: "120px", height: "50px" }} /* Fixed dimensions */
          >
            {/* First Column: Cart Icon */}
            <div className="mr-4">
              <FaShoppingCart size={24} />
            </div>

            {/* Second Column: Two rows with cartCount and subtotal */}
            <div className="flex flex-col">
              <span className="truncate">
                {items.length > 0
                  ? `${cartCount} items`
                  : `Cart (${items.length})`}
              </span>
              <span className="text-md font-normal">
                {items.length > 0 && subtotal}
              </span>
            </div>
          </Link>
          <Link to="/admin" className="hover:text-yellow-400 transition duration-300" onClick={toggleMobileMenu}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
