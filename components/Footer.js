"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-r from-blue-50 via-white to-purple-50 border-t border-gray-100 py-5 mt-1 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left text */}
        <p className="text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} Adaptive Learning Platform
        </p>

        {/* Right links */}
        <div className="flex gap-8 text-sm">
          <a 
            href="/about" 
            className="text-gray-500 font-medium hover:text-blue-600 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
          >
            About
          </a>
          <a 
            href="/terms" 
            className="text-gray-500 font-medium hover:text-blue-600 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
          >
            Terms & Conditions
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;