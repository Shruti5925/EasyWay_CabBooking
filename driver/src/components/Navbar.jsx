import React, { useContext, useState } from "react";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { DriverAppContext } from "../context/DriverContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { setDtoken ,driver } = useContext(DriverAppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    localStorage.removeItem("dtoken");
    setDtoken("");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl ml-12 sm:ml-6 font-bold">EasyWay</h1>
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle Menu"
        className="md:hidden p-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Middle Section - Admin Name (Hidden on Small Screens) */}
      <div className="hidden md:block text-lg font-semibold"> Driver Pannel <span className="text-yellow-400">{driver?.name}</span> </div>

      {/* Right Section - Notifications & Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="relative p-2 rounded hover:bg-gray-700" aria-label="Notifications">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
            
          </span>
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2"
          aria-label="Logout"
          onClick={handleClick}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 p-4 md:hidden flex flex-col space-y-4 shadow-lg">
          <div className="text-lg font-semibold text-center">Driver</div>
          <button
            className="relative p-2 rounded hover:bg-gray-700 flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-2"
            aria-label="Logout"
            onClick={handleClick}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
