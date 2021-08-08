const {tblDictDirectionalityAndSpecialty, tblDictNameDirection, tblDictEnterprise} = require('../models/models');
const Crud = require('./Crud');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const dictEnterpriseController = require('./dictEnterpriseController')
const {Op} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    getOnParams = async (params) => {
        const fn = dictEnterpriseController.getFullName;
        return await tblDictDirectionalityAndSpecialty.findAll({
            attributes: {
                include: [
                    [Sequelize.col('tblDictNameDirection.nameDirection'), 'nameDirection'],
                    [Sequelize.col('tblDictEnterprise.name'), 'nameSubDiv'],
                ]
            },
            where: params,
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictNameDirection,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
                {
                    model: tblDictEnterprise,
                    required: true,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся

                }
            ],
            order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblDictDirectionalityAndSpecialty);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblDictDirectionalityAndSpecialty);
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

    getAll = async (req, res, next) => {
        //await Crud.getAll(req, res, next, tblDictDirectionalityAndSpecialty, [['DirectionalityOrSpecialty', 'ASC']]);
        try {
            const recordset = await this.getOnParams()
            //recordset.model.dataValues = recordset.model.dataValues.map(i => ({...i, fullName: dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            //const t = recordset.t map(async i => ({...i, fullName: await dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getAllDirectionality = async (req, res, next) => {
        //await Crud.getAll(req, res, next, tblDictDirectionalityAndSpecialty, [['DirectionalityOrSpecialty', 'ASC']]);
        try {
            const params = {
                tblDictNameDirectionId: {
                    [Op.not]: null
                }
            }
            const recordset = await this.getOnParams(params)
            //recordset.model.dataValues = recordset.model.dataValues.map(i => ({...i, fullName: dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            //const t = recordset.t map(async i => ({...i, fullName: await dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getAllSpecialty = async (req, res, next) => {
        //await Crud.getAll(req, res, next, tblDictDirectionalityAndSpecialty, [['DirectionalityOrSpecialty', 'ASC']]);
        try {
            const params = {
                tblDictNameDirectionId: {
                    [Op.is]: null
                }
            }
            const recordset = await this.getOnParams(params)
            //recordset.model.dataValues = recordset.model.dataValues.map(i => ({...i, fullName: dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            //const t = recordset.t map(async i => ({...i, fullName: await dictEnterpriseController.getFullName(i.tblDictEnterpriseId)}))
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictDirectionalityAndSpecialty);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()