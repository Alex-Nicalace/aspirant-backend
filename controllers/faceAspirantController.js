const {
    tblFaceAspirant,
    tblDictEducationForm,
    tblDictSubject,
    tblDictDirectionalityAndSpecialty,
    tblDictNameDirection,
    tblAcademicAdvisor,
    tblDictEnterprise,
    tblFace,
    tblFaceName,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceAspirantController {
    getOnParams = async (params) => {
        return await tblFaceAspirant.findAll({
            where: params,
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictEducationForm,
                    attributes: ['educationForm'],
                    required: true,
                    //attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
                {
                    model: tblDictSubject,
                    attributes: ['subject'],
                    required: true,
                    //attributes: [],
                },
                {
                    model: tblDictDirectionalityAndSpecialty,
                    attributes: ['DirectionalityOrSpecialty'],
                    required: true,
                    include: [
                        {
                            model: tblDictNameDirection,
                            attributes: ['nameDirection'],
                            //required: true,
                        },
                        {
                            model: tblDictEnterprise,
                            attributes: ['name'],
                            required: true,
                        }
                    ]
                },
                {
                    model: tblAcademicAdvisor,
                    attributes: ['tblFaceId'],
                    required: true,
                    include: [
                        {
                            model: tblFace,
                            attributes: ['birthdate', 'id'],
                            required: true,
                            include: [
                                {
                                    model: tblFaceName,
                                    attributes: ['lastname', 'firstname', 'middleName'],
                                    required: true,
                                    order: [
                                        ['dateOn', 'DESC'] // сортировка по убыванию, чтобы показать последнюю ФИО
                                    ],
                                    limit: 1, // взять у сортированного списка первую запись
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceAspirant);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceAspirant);
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

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceAspirant, [['dateFinished', 'DESC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceAspirant)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceAspirantController()