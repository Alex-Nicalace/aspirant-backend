const {tblFace_tblOrder, tblOrder, tblFace, tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFace_tblOrder);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFace_tblOrder);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFace_tblOrder)
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblFace_tblOrder)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFace_tblOrder)
    }

    async getAllOneFace(req, res, next) {
        const {faceId} = req.params /*req.query*/;
        try {
            const recordset = await tblFace.findAll({
                where: {
                    id: faceId
                },
                include: [
                    {
                        model: tblOrder,
                        required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    }
                ]
            });
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAllOneOrder(req, res, next) {
        const {orderId} = req.params /*req.query*/;
        try {
            const recordset = await tblOrder.findAll({
                where: {
                    id: orderId
                },
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
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()