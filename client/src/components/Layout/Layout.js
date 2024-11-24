import React from 'react';
import { Helmet } from 'react-helmet';  // For SEO optimization
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title, description, keywords }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{title ? `${title} - My Website` : 'My Website'}</title>
        <meta
          name="description"
          content={description || 'This is an awesome website built with React.'}
        />
        <meta name="keywords" content={keywords || 'website, React, SEO'} />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 p-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
