const {tblFace_tblOrder, tblOrder, tblFace} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
const {tblFaceAspirant} = require("../models/models");
const {tblFaceName} = require("../models/models");
const {Sequelize} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    getOnParams = async (params) => {
        return await tblFace_tblOrder.findAll({
            where: params,
            attributes: [
                'id',
                'tblFaceId',
                'tblOrderId',
                'tblFaceAspirantId',
                'typeRel',
                'note',
                'createdAt',
                'updatedAt',
                [Sequelize.col('tblOrder.numOrder'), 'numOrder'], // указание поля из связной таблицы
                [Sequelize.col('tblOrder.dateOrder'), 'dateOrder'], // указание поля из связной таблицы
                [Sequelize.col('tblOrder.text'), 'text'], // указание поля из связной таблицы
                //[Sequelize.col('tblFaceName.firstname'), 'firstname'], // указание поля из связной таблицы
                // [Sequelize.col('tblFace.birthdate'), 'birthdate'], // указание поля из связной таблицы
                // [Sequelize.col('tblFace.sex'), 'sex'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblOrder,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                },
                {
                    model: tblFace,
                    // attributes: [
                    //     'birthdate', 'sex'
                    // ], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
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
            //order: [['date', 'ASC']],
        });
    }

    getFacesOnParams = async (params) => {
        return await tblFace.findAll({
            where: params,
            include: [
                {
                    model: tblOrder,
                    required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                }
            ]
        });
    }

    getOrdersOnParams = async (params) => {
        return await tblOrder.findAll({
            where: params,
            include: [
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
                }
            ]
        });
    }

    create = async (req, res, next) => {
        try {
            const {tblFaceAspirantId} = req.body;
            const values = {};
            if (tblFaceAspirantId) {
               const {tblFaceId} = await tblFaceAspirant.findByPk(tblFaceAspirantId);
               if (!tblFaceId) {
                   return next(ApiError.badRequest('не удалось найти лицо'))
               }
               values.tblFaceId = tblFaceId;
            }
            const recCreated = await tblFace_tblOrder.create({...req.body, ...values});
            //const recCreated = await Crud.create(req, null, next, tblFace_tblOrder);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFace_tblOrder);
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

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblFace_tblOrder)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFace_tblOrder)
    }

    getAllOneFace = async (req, res, next) => {
        const {faceId} = req.params /*req.query*/;
        const tblFaceId = isNaN(faceId) ? null : faceId
        try {
            const recordset = await this.getOnParams({tblFaceId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getAllOneRecFaceAspirant = async (req, res, next) => {
        const {faceAspirantId} = req.params /*req.query*/;
        const tblFaceAspirantId = isNaN(faceAspirantId) ? null : faceAspirantId
        try {
            const recordset = await this.getOnParams({tblFaceAspirantId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getAllOneOrder = async (req, res, next) => {
        const {orderId} = req.params /*req.query*/;
        const tblOrderId = isNaN(orderId) ? null : orderId
        try {
            const recordset = await this.getOnParams({tblOrderId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()