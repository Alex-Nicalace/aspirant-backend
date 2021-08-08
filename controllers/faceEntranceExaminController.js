const {tblFaceEntranceExamin, tblDictSubject} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');
const {stringToBoolean} = require("../utils/utils");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceEntranceExamin {
    getOnParams = async (params) => {
        return await tblFaceEntranceExamin.findAll({
            where: params,
            attributes: [
                'id', 'date', 'estimate', 'isCandidateMin', 'tblFaceId', 'tblDictSubjectId', 'createdAt', 'updatedAt',
                [Sequelize.col('tblDictSubject.subject'), 'subject'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictSubject,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                },
            ],
            order: [['date', 'ASC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceEntranceExamin);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceEntranceExamin);
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

    getAllOneFace = async (req, res, next) => {
        const {faceId: tblFaceId, isCandidateMin: isCandidateMinStr} = req.params /*req.query*/;
        const isCandidateMin=stringToBoolean(isCandidateMinStr);
        try {
            const recordset = await this.getOnParams({tblFaceId, isCandidateMin})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceEntranceExamin, [['date', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceEntranceExamin)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceEntranceExamin()