import express from 'express'
import { getCart, addToCart, removeFromCart } from '../controllers/Cart.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/add', authMiddleware, addToCart)
router.post('/remove', authMiddleware, removeFromCart)
router.post('/get', authMiddleware, getCart)

export default router