const {tblFaceCertificationResult, tblDictCertificationResult,} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
const {Sequelize} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceCertificationResultController {
    getOnParams = async (params) => {
        return await tblFaceCertificationResult.findAll({
            where: params,
            attributes: [
                'id'
                , 'year'
                , 'createdAt'
                , 'updatedAt'
                , 'tblFaceId'
                , 'tblDictCertificationResultId'
                , [Sequelize.col('tblDictCertificationResult.result'), 'certificationResult'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictCertificationResult,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceCertificationResult);// await tblFaceDocument.create({...req.body});
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceCertificationResult);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        const {id} = req.params;
        try {
            const dataset = await this.getOnParams({id})
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getAllOneFace = async (req, res, next) => { // все записи для указанного лица
        const {faceId: tblFaceId} = req.params;
        try {
            const rec = await this.getOnParams({tblFaceId})
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceCertificationResult)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceCertificationResult)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceCertificationResultController()