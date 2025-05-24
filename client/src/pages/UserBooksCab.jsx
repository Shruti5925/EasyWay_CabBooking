import React, { useState, useEffect, useContext } from "react";
import { CabAppContext } from "../context/CabAppContext"; 
import axios from "axios"; 

export default function UserBooksCab() {
  const { backendUrl, token } = useContext(CabAppContext); 
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/book/user-bookings`,
          {
            headers: { token },
          }
        );

        // console.log(response.data);

        setBookings(response.data.User); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (token) {
      fetchBookings(); 
    }
  }, [token, backendUrl]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>; 
  }

  return (
    <div className=" px-6 py-6 m-4 md:mx-15 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Booked Cabs</h2>

      {bookings.length <= 0 ? (
        <p className="text-gray-500">You have no upcoming bookings.</p> 
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border-b pb-4  transition duration-300"
            >
              <div className="flex justify-between items-center ">
                <p className="font-medium text-lg text-gray-800">
                  <strong>Pickup Location:</strong> <span className="text-pink-400 capitalize">{booking.pickupLocation}</span>
                </p>
                <p className="font-medium text-lg text-gray-800">
                  <strong>Destination:</strong>  <span className="text-pink-400 capitalize">{booking.destination}</span>
                  <p className="text-sm">Booking Id: <span>{booking._id}</span> </p>
                  <p className="text-sm">Mobile no: <span>9904352235</span> </p>
                </p>
              </div>
              <div className="mt-2">
                <p>
                  <strong className="text-gray-600">Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong className="text-gray-600">Time:</strong> {booking.time}
                </p>
                <p className="text-sm">
                  <strong className="text-gray-600">Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
