import express from 'express'
import ProductController from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import productPropController from '../controllers/productPropController.js'

const router = new express.Router()


router.post('/create', authMiddleware, adminMiddleware, ProductController.create)
router.get('/getall', ProductController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/getone/:id([0-9]+)', ProductController.getOne)
router.post('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.delete)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.update)

router.get('/:productId([0-9]+)/property/getall', productPropController.getAll)
// одно свойство товара
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', productPropController.getOne)
// создать свойство товара
router.post(
    '/:productId([0-9]+)/property/create',
    authMiddleware, adminMiddleware,
    productPropController.create
)
// обновить свойство товара
router.put(
    '/:productId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    productPropController.update
)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    productPropController.delete
)


export default router