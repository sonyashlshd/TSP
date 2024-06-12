import RatingModel from '../models/Rating.js'
import ApiError from '../error/ApiError.js'
import auth from "../middleware/authMiddleware.js";

class RatingController {
     async getOne(req, res, next) {
        try {
            const rating = await RatingModel.getOne(req.params.productId)
            res.json(rating)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {productId, rate} = req.params
            const rating = await RatingModel.create(req.auth.id, productId, rate)
            res.json(rating)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

export default new RatingController()