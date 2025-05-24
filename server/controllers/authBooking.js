

import User from '../models/User.js'
import Driver from '../models/Driver.js';
import Booking from '../models/Booking.js';

export const bookDriver = async (req, res) => {
  try {
    const userId = req.user._id;

    const { pickupLocation, destination, date, time, driverId } = req.body;

    // Validate required fields

    if (!pickupLocation || !destination || !date || !time || !driverId) {
      console.log("Missing fields:", { pickupLocation, destination, date, time, driverId });
    }


    if (!date || !time || !pickupLocation || !destination || !driverId) {
      return res.status(400).json({ error: "Date, time, pickupLocation, destination, and driverId are required" });
    }



    // Find the specified driver by driverId
    const availableDriver = await Driver.findById(driverId);

    if (!availableDriver || availableDriver.status !== 'available') {
      return res.status(400).json({ success: false, error: 'Driver is not available at the moment' });
    }

    // Create the booking
    const booking = new Booking({
      user: userId,
      driver: availableDriver._id,
      pickupLocation,
      destination,
      date,
      time,
      status: 'pending', // awaiting driver approval
    });

    await booking.save();

    // Add booking to driver's list but do not change status yet
    availableDriver.bookingsAssigned.push(booking._id);
    await availableDriver.save();

    // Add booking to user's list
    const user = await User.findById(userId);
    user.bookings.push(booking._id);
    await user.save();

    // Send success response
    res.status(201).json({ success: true, message: 'Booked successfully! Waiting for driver approval', booking, driver: availableDriver });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to book driver' });
  }
};









export const getAvailableCabs = async (req, res) => {
  try {
    const { pickupLocation, destination, date, time } = req.body;

    if (!pickupLocation || !destination || !date || !time) {
      return res.status(400).json({ error: "pickupLocation, destination, date, and time are required" });
    }

    // Format the date from DD-MM-YYYY to Date object
    const formattedDate = new Date(date.split("-").reverse().join("-"));

    // Find available drivers who are not booked at the given date and time
    const drivers = await Driver.find({ status: 'available' }).populate('bookingsAssigned');

    // Filter drivers not already booked at the same date & time
    const availableCabs = drivers.filter(driver => {
      return !driver.bookingsAssigned.some(booking => {
        const bookingDate = new Date(booking.date).toDateString();
        const requestDate = formattedDate.toDateString();
        return bookingDate === requestDate && booking.time === time;
      });
    });

    if (availableCabs.length === 0) {
      return res.status(404).json({ message: 'No available cabs at the selected time and date' });
    }

    res.status(200).json({ success: true, availableCabs });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching available cabs' });
  }
};






export const getBookings = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate('bookings');
  if (!user) return res.status(400).json({ error: 'User not found' });

  res.status(200).json({ success: true, User: user.bookings })
};









// Update booking status or assign a driver (this can be done from the booking's controller)
export const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(400).json({ error: 'Booking not found' });

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
};



export const fetchBookingDetails = async (req, res) => {
  const { bookId } = req.body;

  try {
    const booking = await Booking.findById(bookId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching booking",
      error: error.message,
    });
  }
};


export const getALLBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name');  // Populating the 'user' field and only fetching the 'name' field

    res.json({ success: true, bookings });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: 'Server error occurred while fetching bookings' });
  }
};