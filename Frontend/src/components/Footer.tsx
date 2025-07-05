import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-700 to-gray-800
 text-gray-100 py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Minimal Library Management System</span>. All rights reserved.
        </p>

        <p className="text-xs mb-4">
          Developed by <span className="font-bold text-white">MR. SHIHAB</span>
        </p>

        <div className="flex justify-center space-x-6 text-lg">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaLinkedin />
          </a>
          <a href="mailto:youremail@example.com" className="hover:text-gray-300">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
