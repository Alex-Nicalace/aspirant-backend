const {tblFaceResidence} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');
const {tblDictCountry, tblDictCity, tblDictStreet} = require("../models/models");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceFaceResidenceController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceResidence);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceResidence)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceResidence)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceResidence.findAll({
                where: {
                    tblFaceId: faceId
                },
                attributes: [
                    'id', 'dateOn', 'house', 'apartment', 'createdAt', 'updatedAt',
                    [Sequelize.col('tblDictCountry.country'), 'country'], // указание поля из связной таблицы
                    [Sequelize.col('tblDictCity.city'), 'city'], // указание поля из связной таблицы
                    [Sequelize.col('tblDictStreet.street'), 'street'], // указание поля из связной таблицы
                ],
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblDictCountry,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                    {
                        model: tblDictCity,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                    {
                        model: tblDictStreet,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    }
                ],
                order: [['dateOn', 'ASC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceResidence)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceResidence)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceFaceResidenceController()