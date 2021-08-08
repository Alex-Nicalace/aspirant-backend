const {tblFaceExaminations, tblDictSubject} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceExaminationsController {
    getOnParams = async (params) => {
        return await tblFaceExaminations.findAll({
            where: params,
            attributes: [
                'id',
                'estimate',
                'semesterNum',
                'createdAt',
                'updatedAt',
                'tblFaceId',
                'tblDictSubjectId',
                [Sequelize.col('tblDictSubject.subject'), 'subject'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictSubject,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    required: true
                },
            ],
            //order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceExaminations);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceExaminations);
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
        const {faceId: tblFaceId} = req.params /*req.query*/;
        try {
            const recordset = await this.getOnParams({tblFaceId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceExaminations, [['semesterNum', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceExaminations)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceExaminationsController()