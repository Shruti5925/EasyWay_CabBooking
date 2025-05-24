import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 absolute   top-[-55px]  left-4 bg-gray-900 text-white rounded"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-56 w-64 md:static z-50`}
      >
        <h2 className="text-2xl font-bold mb-6">Driver Panel</h2>
        
        <ul className="space-y-4">
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/books" className="block p-2 hover:bg-gray-700 rounded">
              Bookings
            </Link>
          </li>
          {/* <li>
            <Link onClick={()=>setIsOpen(false)} to="/orders" className="block p-2 hover:bg-gray-700 rounded">
              Orders
            </Link>
          </li>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/users" className="block p-2 hover:bg-gray-700 rounded">
              Users
            </Link>
          </li>
          <li>
            <Link onClick={()=>setIsOpen(false)} to="/new-book" className="block p-2 hover:bg-gray-700 rounded">
              Add new  Book
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}