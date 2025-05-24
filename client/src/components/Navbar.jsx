import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CabAppContext } from "../context/CabAppContext";

export default function Navbar() {
  const { token, setToken } = useContext(CabAppContext);

  //  console.log(token);

  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // setIsLoggedIn(false);
    setToken("");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-gray-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-3xl font-extrabold tracking-wide italic">
          EasyWay
        </div>

        <div className="hidden md:flex gap-8 font-semibold">
          <Link
            to="/"
            className="hover:text-yellow-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-200 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/services"
            className="hover:text-yellow-200 transition duration-300"
          >
            Services
          </Link>
          <Link
            to="/bookacab"
            className="hover:text-yellow-200 transition duration-300"
          >
            Book A Cab
            </Link>
          <Link
            to="/OurBookings"
            className="hover:text-yellow-200 transition duration-300"
          >
             Bookings
          </Link>

          {token ? (
            <>
              <Link
                to="/myBooking"
                className="hover:text-yellow-200 transition duration-300"
              >
                My Booking
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-yellow-400 hover:text-gray-100 px-4 py-1 bg-white rounded-xl cursor-pointer text-gray-500
             transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-200 transition duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-7 h-7 cursor-pointer" />
            ) : (
              <Menu className="w-7 h-7 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block py-2 font-semibold hover:text-gray-500"
          >
            Home
          </Link>
          <Link
            to="/booking"
            onClick={toggleMenu}
            className="block py-2 font-semibold hover:text-gray-500"
          >
            Bookings
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block py-2 font-semibold hover:text-gray-500"
          >
            About
          </Link>
          <Link
            to="/services"
            onClick={toggleMenu}
            className="block py-2 font-semibold hover:text-gray-500"
          >
            Services
          </Link>

          {token ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="block py-2 cursor-pointer font-semibold hover:text-gray-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block py-2 font-semibold hover:text-gray-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="block py-2 font-semibold hover:text-gray-500"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
