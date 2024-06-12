import express from 'express'
import orderController from '../controllers/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get(
    '/admin/getall',
    authMiddleware, adminMiddleware,
    orderController.adminGetAll
)
// получить список заказов пользователя
router.get(
    '/admin/getall/user/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    orderController.adminGetUser
)
// получить заказ по id
router.get(
    '/admin/getone/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    orderController.adminGetOne
)
// создать новый заказ
router.post(
    '/admin/create',
    authMiddleware, adminMiddleware,
    orderController.adminCreate
)
// удалить заказ по id
router.delete(
    '/admin/delete/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    orderController.adminDelete
)

/*
 * для авторизованного пользователя
 */

// получить все заказы пользователя
router.get(
    '/user/getall',
    authMiddleware,
    orderController.userGetAll
)
// получить один заказ пользователя
router.get(
    '/user/getone/:id([0-9]+)',
    authMiddleware,
    orderController.userGetOne
)
// создать новый заказ
router.post(
    '/user/create',
    authMiddleware,
    orderController.userCreate
)

/*
 * для неавторизованного пользователя
 */

// создать новый заказ
router.post(
    '/guest/create',
    orderController.guestCreate
)

export default router