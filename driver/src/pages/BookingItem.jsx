import React from "react";
import { Check, X } from "lucide-react";

const BookingItem = ({ booking }) => {
  const handleApprove = () => {
    // TODO: Call API to approve booking
    console.log("Approved booking:", booking._id);
  };

  const handleReject = () => {
    // TODO: Call API to reject booking
    console.log("Rejected booking:", booking._id);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 border border-gray-200">
      <div className="mb-2">
        <p className="text-lg font-semibold">📍 Location: {booking.location}</p>
        <p className="text-gray-600">Customer: {booking.customerName}</p>
        <p className="text-gray-600">Time: {new Date(booking.time).toLocaleString()}</p>
      </div>

      <div className="flex gap-3 mt-3">
        <button
          onClick={handleApprove}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          <Check size={16} /> Approve
        </button>
        <button
          onClick={handleReject}
          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          <X size={16} /> Reject
        </button>
      </div>
    </div>
  );
};

export default BookingItem;
