const {tblAcademicAdvisor, tblFace, tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class academicAdvisorController {
    getOnParams = async (params) => {
        return await tblAcademicAdvisor.findAll({
            where: params,
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
            //order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblAcademicAdvisor);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblAcademicAdvisor);
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
        const {faceId: tblFaceId} = req.params;
        try {
            const recordset = await this.getOnParams({tblFaceId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    getAllFace = async (req, res, next) => {
        try {
            const recordset = await this.getOnParams()
            return res.json(recordset);
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