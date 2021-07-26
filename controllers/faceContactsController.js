const {tblFaceContacts, tblDictContactType} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceContactsController {
    getOnParams = async (params) => {
        return await tblFaceContacts.findAll({
            where: params,
            attributes: [
                'id', 'tblDictContactTypeId', 'contact', 'createdAt', 'updatedAt',
                [Sequelize.col('tblDictContactType.contactType'), 'contactType'], // указание поля из связной таблицы
            ],
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictContactType,
                    attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                },
            ],
            //order: [['dateOn', 'ASC']],
        });
    }

    create = async (req, res, next) => {
        //await Crud.create(req, res, next, tblFaceContacts);
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceContacts);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        //await Crud.update(req, res, next, tblFaceContacts)
        const updateRec = await Crud.update(req, null, next, tblFaceContacts);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        //await Crud.getOne(req, res, next, tblFaceContacts)
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
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceContacts)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceContacts)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceContactsController()