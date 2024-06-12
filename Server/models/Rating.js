import {Product as ProductMapping, Rating as RatingMapping, User as UserMapping} from './models.js'

class Rating {
    async getOne(productId) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const votes = await RatingMapping.count({where: {productId}})
        if (votes) {
            const rates = await RatingMapping.sum('rate', {where: {productId}})
            return {rates, votes, rating: rates/votes}
        }
        return {rates: 0, votes: 0, rating: 0}
    }

    async create(userId, productId, rate) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const user = await UserMapping.findByPk(userId)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return await RatingMapping.create({userId, productId, rate})
    }
}

export default new Rating()