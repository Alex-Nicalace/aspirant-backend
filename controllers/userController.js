const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {tblUser} = require('../models/models');
const {stringToBoolean} = require("../utils/utils");
const  Crud  = require('./Crud');

const generateJwt = (id, login, isAdmin, canInsert, canUpdate, canDelete) => {
    return jwt.sign(
        {
            id,
            login,
            isAdmin,
            canInsert: isAdmin || canInsert,
            canUpdate: isAdmin || canUpdate,
            canDelete: isAdmin || canDelete
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class UserController {
    async registration(req, res, next) {
        const {login, password, isAdmin, canInsert, canUpdate, canDelete} = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный ЛОГИН или ПАРОЛЬ!'));
        }

        const candidate = await tblUser.findOne({where: {login}});
        if (candidate) {
            return next(ApiError.badRequest('Такой ЛОГИН уже существует!'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await tblUser.create({
            login,
            password: hashPassword,
            isAdmin: stringToBoolean(isAdmin),
            canInsert: stringToBoolean(canInsert),
            canUpdate: stringToBoolean(canUpdate),
            canDelete: stringToBoolean(canDelete)});
        //const token = generateJwt(user.id, user.login, user.canInsert, user.canUpdate, user.canDelete);
        return res.json(user);
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

        const token = generateJwt(user.id, user.login, user.isAdmin, user.canInsert, user.canUpdate, user.canDelete);
        return res.json({token});
    }

    async check(req, res) {
        // генерирует новый токен и отправляет на клиент
        const token = generateJwt(req.user.id, req.user.login, req.user.isAdmin, req.user.canInsert, req.user.canUpdate, req.user.canDelete);
        return res.json({token});
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblUser, [['login', 'ASC']])
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblUser);
    }

    async update(req, res, next) {
        const {id, login, password, isAdmin, canInsert, canUpdate, canDelete} = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный ЛОГИН или ПАРОЛЬ!'));
        }

        const rec = await tblUser.findByPk(id); // нахожу запись по первичному ключу
        if (!rec) {
            next(ApiError.badRequest('record not found'));
        }

        const hashPassword = await bcrypt.hash(password, 5);

        rec.login = login;
        rec.password = hashPassword;
        rec.isAdmin = isAdmin;
        rec.canInsert = canInsert;
        rec.canUpdate = canUpdate;
        rec.canDelete = canDelete;

        try {
            await rec.save();
            return res.json(rec);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

        // await Crud.update(req, res, next, tblUser);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblUser)
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new UserController()