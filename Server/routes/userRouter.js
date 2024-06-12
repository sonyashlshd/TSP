import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)

router.get('/getall', authMiddleware, adminMiddleware, userController.getAll)
router.get('/getone/:id([0-9]+)', authMiddleware, adminMiddleware, userController.getOne)
router.post('/create', authMiddleware, adminMiddleware, userController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, userController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, userController.delete)

export default router