const {tblDictEducationForm} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
//const {ValidationError} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictEducationFormController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictEducationForm);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictEducationForm);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictEducationForm);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictEducationForm, [['educationForm', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictEducationForm);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictEducationFormController()