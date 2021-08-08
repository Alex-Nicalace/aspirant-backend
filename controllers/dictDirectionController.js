const {tblDictNameDirection} = require('../models/models');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictNameDirection);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictNameDirection);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictNameDirection);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictNameDirection, [['nameDirection', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictNameDirection);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()