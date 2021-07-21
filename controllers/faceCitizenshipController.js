const {tblFaceCitizenship} = require('../models/models');
const ApiError = require('../error/ApiError');
const {tblDictCountry} = require("../models/models");
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceCitizenshipController {
    getOnParams = async (params) => {
        return await tblFaceCitizenship.findAll({
            where: params,
            attributes: [ // указание какие поля необходимо вывести
                'id', 'createdAt', 'updatedAt', 'tblFaceId', 'tblDictCountryId',
                [Sequelize.col('tblDictCountry.country'), 'citizenship'] // указание поля из связной таблицы

            ],
            include: [
                {
                    model: tblDictCountry,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    //as: 'Citizenship'
                    required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                },
            ]
        });
    }

    create = async (req, res, next) => {
        //await Crud.create(req, res, next, tblFaceCitizenship);
        try{
            const recCreated = await tblFaceCitizenship.create({...req.body});
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.updateWithoutRes(req, next, tblFaceCitizenship);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        //await Crud.getOne(req, res, next, tblFaceCitizenship)
        const {id} = req.params;
        try {
            const dataset = await this.getOnParams({id})
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getAllOneFace = async (req, res, next) => {
        const {faceId: tblFaceId} = req.params /*req.query*/;
        try {
            const recordset = await this.getOnParams({tblFaceId})
            // const recordset = await tblFaceCitizenship.findAll({
            //     where: {
            //         tblFaceId: faceId
            //     },
            //     attributes: [ // указание какие поля необходимо вывести
            //         'id', 'createdAt', 'updatedAt', 'tblFaceId', 'tblDictCountryId',
            //         [Sequelize.col('tblDictCountry.country'), 'citizenship'] // указание поля из связной таблицы
            //
            //     ],
            //     include: [
            //         {
            //             model: tblDictCountry,
            //             attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
            //             //as: 'Citizenship'
            //             required: true // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
            //         },
            //     ]
            // });
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblFaceCitizenship)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceCitizenship)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceCitizenshipController()