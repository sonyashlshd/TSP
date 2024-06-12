import BasketProductModel from '../models/BasketProduct.js'
import ProductModel from '../models/Product.js'
import AppError from '../error/ApiError.js'

const check = async (req, res, next) => {
    try {
        if (!req.signedCookies.basketId) {
            throw new Error('Корзина еще не создана')
        }
        const exist = await ProductModel.isExist(req.signedCookies.basketId)
        if (!exist) {
            res.clearCookie('basketId')
            throw new Error('Корзина не найдена в БД')
        }
    } catch(e) {
        next(AppError.badRequest(e.message))
    }
}

class BasketProductController {
    async getAll(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            const products = await BasketProductModel.getAll(req.signedCookies.basketId)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await BasketProductModel.create(
                req.signedCookies.basketId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await BasketProductModel.update(
                req.signedCookies.basketId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await BasketProductModel.delete(
                req.signedCookies.basketId,
                req.params.productId,
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BasketProductController()