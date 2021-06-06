const {tblDictCity} = require('../models/models');
//const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictCityController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictCity);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictCity);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictCity);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictCity, [['city', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictCity);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictCityController()