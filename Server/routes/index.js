import express from 'express'

import productRouter from './productRouter.js'
import categoryRouter from './categoryRouter.js'
import userRouter from './userRouter.js'
import basketRouter from './basketRouter.js'
import ratingRouter from './ratingRouter.js'
import orderRouter from './orderRouter.js'

const router = new express.Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)

export default router