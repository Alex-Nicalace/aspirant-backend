const {tblDictDoc} = require("../models/models");


// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictDocController {
    async create(req, res) {
        const {document} = req.body; // т.к. это post запрос то у него body
        const rec = await tblDictDoc.create({document});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, document} = req.body; // деструктуризация тела запроса
        const rec = await tblDictDoc.findByPk(id); // нахожу запись по первичному ключу
        rec.document = document;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblDictDoc.findByPk(id);
        return res.json(rec);
    }

    async getAll(req, res) {
        const recordset = await tblDictDoc.findAll();
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblDictDoc.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictDocController()