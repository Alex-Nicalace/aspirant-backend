const {tblFaceCitizenship} = require('../models/models');
const ApiError = require('../error/ApiError');
const {tblDictCountry} = require("../models/models");
const {Sequelize} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceCitizenshipController {
    async create(req, res) {
        const {tblFaceId, tblDictCountryId} = req.body;
        // т.к. это post запрос то у него body
        const rec = await tblFaceCitizenship.create({tblFaceId, tblDictCountryId});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, tblFaceId, tblDictCountryId} = req.body; // деструктуризация тела запроса
        const rec = await tblFaceCitizenship.findByPk(id); // нахожу запись по первичному ключу
        rec.tblFaceId = tblFaceId;
        rec.tblDictCountryId = tblDictCountryId;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblFaceCitizenship.findByPk(id);
        return res.json(rec);

    }

    async getAllOneFace(req, res) {
        const {faceId} = req.params /*req.query*/;
        const recordset = await tblFaceCitizenship.findAll({
            where: {
                tblFaceId: faceId
            },
            attributes: [ // указание какие поля необходимо вывести
                'id','createdAt','updatedAt','tblFaceId','tblDictCountryId',
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
        return res.json(recordset);

    }

    async getAll(req, res) {
        const recordset = await tblFaceCitizenship.findAll();
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblFaceCitizenship.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceCitizenshipController()