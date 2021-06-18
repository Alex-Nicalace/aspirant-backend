const {tblAcademicAdvisor, tblFace, tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class academicAdvisorController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblAcademicAdvisor);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblAcademicAdvisor)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblAcademicAdvisor)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblAcademicAdvisor.findAll({
                where: {
                    tblFaceId: faceId
                },
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblFace,
                        required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                        include: [
                            {
                                model: tblFaceName,
                                order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                                limit: 1, // взять у сортированного списка первую запись
                            }
                        ]
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
        await Crud.getAll(req, res, next, tblAcademicAdvisor)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblAcademicAdvisor)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new academicAdvisorController()