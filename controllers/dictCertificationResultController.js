const {tblDictCertificationResult} = require('../models/models');
//const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictCertificationResultController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictCertificationResult);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictCertificationResult);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictCertificationResult);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictCertificationResult, [['result', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictCertificationResult);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictCertificationResultController()