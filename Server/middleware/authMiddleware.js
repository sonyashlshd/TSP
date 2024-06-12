import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'

const decode = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(e) {
        throw new Error('Неверная подпись токена')
    }
}

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if (!token) {
            throw new Error('Требуется авторизация')
        }
        req.auth = decode(token)
        next()
    } catch (e) {
        next(ApiError.forbidden(e.message))
    }
}

export default auth