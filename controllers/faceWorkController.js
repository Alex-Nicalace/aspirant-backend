const {tblFaceWork} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceWorkController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceWork);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceWork)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceWork)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceWork.findAll({
                where: {
                    tblFaceId: faceId
                },
                order: [['dateOn', 'ASC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceWork, [['dateFinished', 'DESC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceWork)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceWorkController()