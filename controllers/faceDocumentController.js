const {tblFaceDocument} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const {tblDictDoc} = require("../models/models");
const {tblDictCountry} = require("../models/models");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceDocumentController {
    async create(req, res) {
        const {tblFaceId, tblDictCountryId, tblDictDocId, dateOn, dateOff} = req.body;
        // т.к. это post запрос то у него body
        const rec = await tblFaceDocument.create({tblFaceId, tblDictCountryId, tblDictDocId, dateOn, dateOff});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, tblFaceId, tblDictCountryId, tblDictDocId, dateOn, dateOff} = req.body; // деструктуризация тела запроса
        const rec = await tblFaceDocument.findByPk(id); // нахожу запись по первичному ключу
        if (!rec)
            return res.json({message: 'record not found'});
        rec.tblFaceId = tblFaceId;
        rec.tblDictCountryId = tblDictCountryId;
        rec.tblDictDocId = tblDictDocId;
        rec.dateOn = dateOn;
        rec.dateOff = dateOff;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblFaceDocument.findByPk(id);
        return res.json(rec);

    }

    async getAllOneFace(req, res) {
        const {faceId} = req.params;
        const rec = await tblFaceDocument.findAll({
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
            ]
        });
        return res.json(rec);

    }

    async getAll(req, res) {
        const recordset = await tblFaceDocument.findAll();
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblFaceDocument.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceDocumentController()