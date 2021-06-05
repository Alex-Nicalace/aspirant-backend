const ApiError = require("../error/ApiError");
const {tblDictDoc} = require("../models/models");
const  Crud  = require('./Crud');


// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictDocController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictDoc);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictDoc);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictDoc);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictDoc, [['document', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictDoc)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictDocController()