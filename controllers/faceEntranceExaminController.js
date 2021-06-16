const {tblFaceEntranceExamin} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceEntranceExamin {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceEntranceExamin);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceEntranceExamin)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceEntranceExamin)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceEducation.findAll({
                where: {
                    tblFaceId: faceId
                },
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
                order: [['dateFinished', 'DESC']],
            });
            return res.json(rec);
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