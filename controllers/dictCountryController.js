const {tblDictCountry} = require('../models/models');
const ApiError = require('../error/ApiError');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictCountryController {
    async create(req, res) {
        const {country} = req.body;
        // т.к. это post запрос то у него body
        const rec = await tblDictCountry.create({country});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, country} = req.body; // деструктуризация тела запроса
        const rec = await tblDictCountry.findByPk(id); // нахожу запись по первичному ключу
        rec.country = country;
        await rec.save();
        return res.json(rec);
    }

    async get(req, res) {
        const {id} = req.params;
        const rec = await tblDictCountry.findByPk(id);
        return res.json(rec);

    }

    async getAll(req, res) {
        const recordset = await tblDictCountry.findAll();
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblDictCountry.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictCountryController()