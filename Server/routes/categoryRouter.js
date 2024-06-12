import express from 'express'
import categoryController from '../controllers/categoryController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', categoryController.getAll)
router.get('/getone/:id([0-9]+)', categoryController.getOne)
router.post('/create', authMiddleware, adminMiddleware, categoryController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, categoryController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, categoryController.delete)

export default router