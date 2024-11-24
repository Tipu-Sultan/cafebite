import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Cafebite</h1>
            <p className="text-sm mt-2">Your favorite spot for great coffee and bites!</p>
          </div>

          <div className="flex space-x-4">
            {/* Social Media Links */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Twitter
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center border-t border-gray-600 pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cafebite. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            {/* Quick Links */}
            <a href="/about" className="text-gray-400 hover:text-white">
              About Us
            </a>
            <a href="/menu" className="text-gray-400 hover:text-white">
              Menu
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
