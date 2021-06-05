const {tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceNameController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceName);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceName);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceName)
    }

    async getAll(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceName)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceName)
    }

    async getAllNamesOneFace(req, res) {
        const {faceId} = req.params /*req.query*/;
        const recordset = await tblFaceName.findAll({
            where: {
                tblFaceId: faceId
            }
        });
        return res.json(recordset);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceNameController()