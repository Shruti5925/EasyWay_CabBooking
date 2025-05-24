import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CabAppContext } from '../context/CabAppContext';

const OurBooking = () => {
    const { backendUrl } = useContext(CabAppContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/book/allbooking`);
                console.log('Bookings:', response);  // Log the response to inspect the structure
                setBookings(Array.isArray(response.data.bookings) ? response.data.bookings : []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto bg-white  rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-600">Our Bookings</h2>

                {bookings.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No bookings available</p>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead className="bg-gradient-to-r from-yellow-500 to-gray-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 border-b">Booking ID</th>
                                    <th className="px-6 py-3 border-b">User Name</th>
                                    <th className="px-6 py-3 border-b">Pickup Location</th>
                                    <th className="px-6 py-3 border-b">Destination</th>
                                    <th className="px-6 py-3 border-b">Status</th>
                                    <th className="px-6 py-3 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr
                                        key={booking._id}
                                        className={`${
                                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } hover:bg-gray-100 transition-colors duration-300`}
                                    >
                                        <td className="px-6 py-4 border-b">{booking._id}</td>
                                        <td className="px-6 py-4 border-b">{booking.user.name}</td>
                                        <td className="px-6 py-4 border-b">{booking.pickupLocation}</td>
                                        <td className="px-6 py-4 border-b">{booking.destination}</td>
                                        <td className="px-6 py-4 border-b">
                                            <span
                                                className={`inline-block px-4 py-2 rounded-full text-white ${
                                                    booking.status === 'confirmed'
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }`}
                                            >
                                                {booking.status.charAt(0).toUpperCase() +
                                                    booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-b text-center">
                                            <button className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurBooking;
