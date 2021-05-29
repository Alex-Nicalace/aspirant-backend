const {tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceNameController {
    async create(req, res) {
        const {dateOn, lastname, firstname, middleName, tblFaceId} = req.body;
        // т.к. это post запрос то у него body
        const rec = await tblFaceName.create({dateOn, lastname, firstname, middleName, tblFaceId});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, dateOn, lastname, firstname, middleName, tblFaceId} = req.body; // деструктуризация тела запроса
        const rec = await tblFaceName.findByPk(id); // нахожу запись по первичному ключу
        if (!rec)
            return res.json({message: 'record not found'});
        rec.dateOn = dateOn;
        rec.lastname = lastname;
        rec.firstname = firstname;
        rec.middleName = middleName;
        rec.tblFaceId = tblFaceId;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblFaceName.findByPk(id);
        return res.json(rec);

    }

    async getAll(req, res) {
        const recordset = await tblFaceName.findAll();
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblFaceName.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }

    async getAllNamesOneFace(req, res) {
        const {faceId} = req.params /*req.query*/;
        const recordset = await tblFaceName.findAll({
            where: {
                tblFaceId: faceId
            }
        });
        return res.json(recordset);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceNameController()