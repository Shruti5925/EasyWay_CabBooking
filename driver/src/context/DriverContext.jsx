import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const DriverAppContext = createContext();

export const DriverAppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dtoken, setDtoken] = useState(() => localStorage.getItem("dtoken") || "");
  const [driver, setDriver] = useState();
  const [bookings, setBookings] = useState([]);

  const fetchDriverDetails = async () => {
    try {
      if (!dtoken) return;

      const response = await axios.get(`${backendUrl}/api/driver/profile`, {
        headers: {
          dtoken, // Ensure your backend expects this
          // Or use: Authorization: `Bearer ${dtoken}` depending on backend setup
        },
      });

      console.log(response);

      setDriver(response.data.driver);
    } catch (error) {
      console.error("Error fetching driver details:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDriverDetails();
  }, [dtoken]);

  useEffect(() => {
    if (dtoken) {
      localStorage.setItem("dtoken", dtoken);
    } else {
      localStorage.removeItem("dtoken");
    }
  }, [dtoken]);

  // Optional: refetch driver manually from anywhere
  const refetchDriver = () => {
    fetchDriverDetails();
  };

  const value = {
    backendUrl,
    dtoken,
    setDtoken,
    driver,
    bookings,
    setBookings,
    refetchDriver,
  };

  return (
    <DriverAppContext.Provider value={value}>
      {children}
    </DriverAppContext.Provider>
  );
};

export default DriverAppContextProvider;
