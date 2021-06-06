const {tblDictStreet} = require('../models/models');
//const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictStreetController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictStreet);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictStreet);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictStreet);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictStreet, [['street', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictStreet);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictStreetController()