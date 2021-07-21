const {tblFaceDocument} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const {tblDictDoc} = require("../models/models");
const {tblDictCountry} = require("../models/models");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceDocumentController {
    getOnParams = async (params) => {
        return await tblFaceDocument.findAll({
            where: params,
            attributes: [
                'id', 'dateOn', 'dateOff', 'createdAt', 'updatedAt', 'numDocument', 'tblDictCountryId', 'tblDictDocId', 'tblFaceId',
                [Sequelize.col('tblDictCountry.country'), 'country'], // указание поля из связной таблицы
                [Sequelize.col('tblDictDoc.document'), 'document'], // указание поля из связной таблицы
            ],
            include: [
                {
                    model: tblDictCountry,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
                {
                    model: tblDictDoc,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                }
            ],
            order: [['dateOn', 'ASC']],
        });

    }

    create = async (req, res, next) => {
        //await Crud.create(req, res, next, tblFaceDocument);
        try {
            const recCreated = await tblFaceDocument.create({...req.body});
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.updateWithoutRes(req, next, tblFaceDocument);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        //await Crud.getOne(req, res, next, tblFaceDocument)
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
            const rec = await this.getOnParams({tblFaceId})
            /*await tblFaceDocument.findAll({
                where: {
                    tblFaceId: faceId
                },
                attributes: [
                    'id', 'dateOn', 'dateOff', 'createdAt', 'updatedAt',
                    [Sequelize.col('tblDictCountry.country'), 'country'], // указание поля из связной таблицы
                    [Sequelize.col('tblDictDoc.document'), 'document'], // указание поля из связной таблицы
                ],
                include: [
                    {
                        model: tblDictCountry,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                    {
                        model: tblDictDoc,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    }
                ],
                order: [['dateOn', 'ASC']],
            });*/
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))

        }
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblFaceDocument, [['dateOn', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceDocument)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceDocumentController()