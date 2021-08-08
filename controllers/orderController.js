const {tblOrder} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblOrder);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblOrder)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblOrder)

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblOrder, [['dateOrder', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblOrder)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()