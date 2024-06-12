import {Product as ProductMapping, ProductProp as ProductPropMapping} from './models.js'

class ProductProp {
    async getAll(productId) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return await ProductPropMapping.findAll({where: {productId}})
    }

    async getOne(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('Свойство товара не найдено в БД')
        }
        return property
    }

    async create(productId, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const {name, value} = data
        return await ProductPropMapping.create({name, value, productId})
    }

    async update(productId, id, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('Свойство товара не найдено в БД')
        }
        const {name = property.name, value = property.value} = data
        await property.update({name, value})
        return property
    }

    async delete(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('Свойство товара не найдено в БД')
        }
        await property.destroy()
        return property
    }
}

export default new ProductProp()