import React from "react";

export default function Footer() {
  return (
    <div className="bg-black text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2025 Your Company. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/about" className="text-gray-300 hover:text-white">About Us</a>
          <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
