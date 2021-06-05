const {tblDictEducationLevel} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
//const {ValidationError} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictCountryController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictEducationLevel);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictEducationLevel);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictEducationLevel);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictEducationLevel, [['weightEducationLevel', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictEducationLevel);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictCountryController()