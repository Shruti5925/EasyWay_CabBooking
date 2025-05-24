// const Driver = require('../models/Driver');
// const Booking = require('../models/Booking');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Driver from '../models/Driver.js'
import Booking from '../models/Booking.js';



// Register driver
export const registerDriver = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existingDriver = await Driver.findOne({ phone });
    if (existingDriver) {
      return res.json({
        success: false,
        error: 'Driver with this phone number already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new Driver({
      name,
      phone,
      password: hashedPassword,
    });

    await newDriver.save();

    const dtoken = jwt.sign({ id: newDriver._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      msg: 'Driver registered successfully',
      user: {
        id: newDriver._id,
        name: newDriver.name,
        phone: newDriver.phone,
      },
      dtoken,
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Login driver
export const loginDriver = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const driver = await Driver.findOne({ phone });

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const dtoken = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // console.log(dtoken);

    res.json({
      success: true, message: 'Login successful', driver,dtoken
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get driver profile
export const getDriver = async (req, res) => {
  try {
    const driverId = req.driver?._id;

    if (!driverId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const driver = await Driver.findById(driverId).select('-password');
    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    res.status(200).json({ success: true, driver });
  } catch (error) {
    console.error('Get driver error:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};





export const driverApproveBooking = async (req, res) => {
  try {
    const driverId = req.driver._id; // Extract driver ID from authentication

    const { bookingId, action } = req.body; // action can be 'approve' or 'reject'

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    // Check if the booking is assigned to the current driver
    if (String(booking.driver) !== String(driverId)) {
      return res.status(403).json({ error: "You are not assigned to this booking" });
    }

    // Handle booking actions (approve or reject)
    if (action === 'approve') {
      // Change the booking status to 'confirmed'
      booking.status = 'confirmed';

      // Update the driver's status to 'busy'
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ success: false, error: "Driver not found" });
      }
      driver.status = 'busy';
      await driver.save();

      // Add the booking to the user's booking list
      const user = await User.findById(booking.user);
      if (user) {
        user.bookings.push(booking._id);
        await user.save();
      }

    } else if (action === 'reject') {
      // Reject the booking and change status to 'rejected'
      booking.status = 'rejected';

      // Remove the booking from the driver's assigned bookings
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ success: false, error: "Driver not found" });
      }
      driver.bookingsAssigned = driver.bookingsAssigned.filter(id => String(id) !== bookingId);
      await driver.save();

    } else {
      return res.status(400).json({ success: false, error: "Invalid action. Please use 'approve' or 'reject'" });
    }

    // Save the booking after updating the status
    await booking.save();

    // Respond with success message and updated booking details
    res.status(200).json({ success: true, message: `Booking ${action}ed successfully`, booking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while processing the booking" });
  }
};





export const getAvailableCabs = async (req, res) => {
  console.log("call get available cab routes");
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

    res.status(200).json({ availableCabs });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching available cabs' });
  }
};







//////////////////////



export const getDriverBookings = async (req, res) => {
  const driverId = req.driver._id // Extracted from auth middleware
  // console.log(driverId)
  try {
    // Fetch bookings assigned to this driver, and populate user details
    const bookings = await Booking.find({ driver: driverId })
      .populate("user", "name email") // only fetch name & email from User
      .sort({ date: -1, time: -1 }); // optional: latest bookings first

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};





