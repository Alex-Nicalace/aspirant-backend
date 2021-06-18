const {tblFaceScientificPublications, tblFace, tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceScientificPublicationsController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceScientificPublications);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceScientificPublications)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceScientificPublications)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceScientificPublications.findAll({
                where: {
                    tblFaceId: faceId
                },
                // attributes: [
                //     'id', 'dateFinished', 'specialty', 'isExcellent', 'quantitySatisfactory', 'tblDictEducationLevelId', 'createdAt', 'updatedAt',
                //     [Sequelize.col('tblDictEducationLevel.educationLevel'), 'educationLevel'], // указание поля из связной таблицы
                // ],
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblFace,
                        required: true,
                        //attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                        include: [
                            {
                                model: tblFaceName,
                                order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                                limit: 1, // взять у сортированного списка первую запись
                            }
                        ]
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
        await Crud.getAll(req, res, next, tblFaceScientificPublications, [['date', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceScientificPublications)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceScientificPublicationsController()