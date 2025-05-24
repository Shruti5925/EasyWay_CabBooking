import express from 'express'
import {registerDriver,getAvailableCabs,loginDriver,driverApproveBooking, getDriver, getDriverBookings} from '../controllers/authDriver.js'
import driverAuth from '../middleware/driverAuth.js';
import { fetchBookingDetails } from '../controllers/authBooking.js';


const router=express.Router();

router.post('/register',registerDriver);
router.post('/login',loginDriver)
router.get('/profile',driverAuth,getDriver)
router.post('/cab-available', getAvailableCabs)
router.put('/approval',driverAuth,driverApproveBooking);
router.post('/booking-details',driverAuth,fetchBookingDetails)
router.post('/fetchAllBooking',driverAuth,getDriverBookings )


export default router;
