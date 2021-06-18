const {tblFaceBusinessTrip } = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceBusinessTripController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceBusinessTrip);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceBusinessTrip)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceBusinessTrip)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceBusinessTrip.findAll({
                where: {
                    tblFaceId: faceId
                },
                order: [['date', 'DESC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceBusinessTrip, [['date', 'DESC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceBusinessTrip)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceBusinessTripController()