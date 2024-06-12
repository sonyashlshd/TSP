import express from 'express'
import ratingController from '../controllers/ratingController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new express.Router()

router.get('/product/:productId([0-9]+)', ratingController.getOne)
router.post('/product/:productId([0-9]+)/rate/:rate([1-5])', authMiddleware, ratingController.create)

export default router