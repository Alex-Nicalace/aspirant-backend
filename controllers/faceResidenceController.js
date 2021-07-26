const {tblFaceResidence} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');
const {tblDictCountry, tblDictCity, tblDictStreet} = require("../models/models");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceFaceResidenceController {
    getOnParams = async (params) => {
        return await tblFaceResidence.findAll({
            where: params,
            attributes: [
                'id', 'dateOn', 'tblDictCountryId', 'tblDictCityId', 'tblDictStreetId', 'house',
                'apartment', 'createdAt', 'updatedAt',
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
    }

    create = async (req, res, next) => {
        //await Crud.create(req, res, next, tblFaceResidence);
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceResidence);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        //await Crud.update(req, res, next, tblFaceResidence)
        const updateRec = await Crud.update(req, null, next, tblFaceResidence);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        //await Crud.getOne(req, res, next, tblFaceResidence)
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
        await Crud.getAll(req, res, next, tblFaceResidence)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceResidence)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceFaceResidenceController()