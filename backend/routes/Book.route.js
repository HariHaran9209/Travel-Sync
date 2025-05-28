import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeBooking, verifyBooking, userBookings, listBookings, updateBookingStatus } from '../controllers/Book.controller.js'

const router = express.Router()

router.post('/place', authMiddleware, placeBooking)
router.post('/verify', verifyBooking)
router.post('/userorders', authMiddleware, userBookings)
router.get('/list', listBookings)
router.post('/status', updateBookingStatus)

export default router