import express from 'express'

import {bookDriver, getALLBookings, getBookings} from '../controllers/authBooking.js'
import userAuth from '../middleware/userAuth.js'

const router= express.Router()

router.post('/book-cabs',userAuth, bookDriver)

router.get('/user-bookings',userAuth, getBookings)

router.get('/allbooking', getALLBookings)

export default router
