const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {tblUser} = require('../models/models');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class UserController {
    async registration(req, res, next) {
        const {login, password, role} = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный ЛОГИН или ПАРОЛЬ!'));
        }

        const candidate = await tblUser.findOne({where: {login}});
        if (candidate) {
            return next(ApiError.badRequest('Такой ЛОГИН уже существует!'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await tblUser.create({login, password: hashPassword, role});
        const token = generateJwt(user.id, user.login, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {login, password} = req.body;

        const user = await tblUser.findOne({where: {login}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'));
        }

        const token = generateJwt(user.id, user.login, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role);
        return res.json({token});
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new UserController()