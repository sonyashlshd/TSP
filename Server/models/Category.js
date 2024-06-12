import {Category as CategoryMapping} from './models.js'

class Category {
    async getAll() {
        return await CategoryMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
    }

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Тип не найден в БД')
        }
        return category
    }

    async create(data) {
        const {name} = data
        const exist = await CategoryMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой тип уже есть')
        }
        return await CategoryMapping.create({name})
    }

    async update(id, data) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Тип не найден в БД')
        }
        const {name = category.name} = data
        await category.update({name})
        return category
    }

    async delete(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Тип не найден в БД')
        }
        await category.destroy()
        return category
    }
}

export default new Category()