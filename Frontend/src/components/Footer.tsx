import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Minimal Library Management System. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Developed by Your Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;
