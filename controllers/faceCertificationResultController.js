const {tblFaceCertificationResult, tblDictCertificationResult, } = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceCertificationResultController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceCertificationResult);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceCertificationResult)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceCertificationResult)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceCertificationResult.findAll({
                where: {
                    tblFaceId: faceId
                },
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblDictCertificationResult,
                        //attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceCertificationResult, [['dateFinished', 'DESC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceCertificationResult)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceCertificationResultController()