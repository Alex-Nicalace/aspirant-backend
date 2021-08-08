const {tblFaceEducation, tblDictEducationLevel} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceEducationController {
    getOnParams = async (params) => {
        return await tblFaceEducation.findAll({
            where: params,
            attributes: [
                'id', 'dateFinished', 'specialty', 'isExcellent', 'quantitySatisfactory', 'tblDictEducationLevelId', 'createdAt', 'updatedAt',
                [Sequelize.col('tblDictEducationLevel.educationLevel'), 'educationLevel'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictEducationLevel,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
            ],
            //order: [['dateFinished', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        //await Crud.create(req, res, next, tblFaceEducation);
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceEducation);// await tblFaceDocument.create({...req.body});
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        //await Crud.update(req, res, next, tblFaceEducation)
        const updateRec = await Crud.update(req, null, next, tblFaceEducation);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        //await Crud.getOne(req, res, next, tblFaceEducation)
        const {id} = req.params;
        try {
            const dataset = await this.getOnParams({id})
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getAllOneFace = async(req, res, next) => { // все записи для указанного лица
        const {faceId: tblFaceId} = req.params;
        try {
            const rec = await this.getOnParams({tblFaceId})
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceEducation, [['dateFinished', 'DESC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceEducation)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceEducationController()