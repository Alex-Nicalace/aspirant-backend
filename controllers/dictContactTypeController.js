const {tblDictContactType} = require('../models/models');
//const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictContactTypeController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictContactType);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictContactType);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictContactType);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictContactType, [['contactType', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictContactType);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictContactTypeController()