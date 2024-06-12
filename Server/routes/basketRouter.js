import Router from 'express'
import basketController from '../controllers/basketController.js'

const router = new Router()

router.get('/getone', basketController.getOne)
router.put('/product/:productId([0-9]+)/append/:quantity([0-9]+)', basketController.append)
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)', basketController.increment)
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)', basketController.decrement)
router.put('/product/:productId([0-9]+)/remove', basketController.remove)
router.put('/clear', basketController.clear)

export default router