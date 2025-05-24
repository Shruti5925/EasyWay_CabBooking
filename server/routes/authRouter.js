import express from 'express';
import { register, login, getUser } from '../controllers/authUser.js';
import userAuth from '../middleware/userAuth.js';
import { getBookings } from '../controllers/authBooking.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile',userAuth,getUser)
router.get('/getBooking',userAuth,getBookings)

export default router;
