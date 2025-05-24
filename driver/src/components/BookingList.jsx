import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DriverAppContext } from '../context/DriverContext';
import { toast } from 'react-toastify';

const BookingList = () => {
  const { dtoken, backendUrl } = useContext(DriverAppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/driver/fetchAllBooking`,
        {},
        {
          headers: {
            dtoken,
          },
        }
      );
      setBookings(response.data.bookings);
    } catch (error) {
      toast.error('Failed to load bookings',error);
    }
  };

  useEffect(() => {
    if (dtoken) fetchBookings();
  }, [dtoken]);

 
  const updateStatus = async (bookingId) => {

    console.log(bookingId);
    try {
      // Make sure dtoken exists
      if (!dtoken) {
        toast.error("Authentication required");
        return;
      }
  
      // Update booking status via API
      const response = await axios.put(
        `${backendUrl}/api/driver/approval`,
        { bookingId, action: "approve" },
        {
          headers: {
            dtoken,
          },
        },
      );

      console.log(response)
  
      // Check if the response is successful and show the success toast
      if (response.data.success) {
        toast.success("Status updated successfully");
        fetchBookings(); // Refresh bookings after updating status
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      // Handle errors, showing the error from the response if available
      const errorMessage = error.response?.data?.error || 'Failed to update status';
      toast.error(errorMessage);
    }
  };
  
  

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/driver/approval`,
        { bookingId, action: 'reject' },
        {
          headers: {
            dtoken,
          },
        }
      );
      console.log(response);
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to cancel booking');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6 border-b pb-2"> Driver Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p><span className="font-medium">👤 User:</span> {booking.user?.name || 'N/A'}</p>
                <p><span className="font-medium">📧 Email:</span> {booking.user?.email || 'N/A'}</p>
                <p><span className="font-medium">📍 Pickup:</span> {booking.pickupLocation}</p>
                <p><span className="font-medium">🎯 Destination:</span> {booking.destination}</p>
                <p><span className="font-medium">📅 Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                <p><span className="font-medium">⏰ Time:</span> {booking.time}</p>
                <p><span className="font-medium">📌 Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${
                    booking.status === 'pending' ? 'bg-yellow-500' :
                    booking.status === 'confirmed' ? 'bg-blue-500' :
                    booking.status === 'completed' ? 'bg-green-600' :
                    'bg-red-500'
                  }`}>
                    {booking.status}
                  </span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex gap-3">
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(booking._id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                       Confirm
                    </button>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                       Cancel
                    </button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => updateStatus(booking._id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                       Complete
                    </button>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                       Cancel
                    </button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <p className="text-green-600 text-sm">Booking Completed</p>
                )}
                {booking.status === 'cancelled' && (
                  <p className="text-red-600 text-sm">Booking Cancelled</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
