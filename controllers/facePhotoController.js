const ApiError = require('../error/ApiError');
const {tblFacePhoto} = require('../models/models');
const Crud = require('./Crud');


// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class facePhotoController {
    getOnParams = async (params) => {
        return  tblFacePhoto.findAll({
            where: params
        })
    }

    async create(req, res, next) {
        try {
            const {dateOn, tblFaceId} = req.body;// т.к. это post запрос то у него body
            const {file} = req.files; // получаю файл из тела запроса
            const rec = await tblFacePhoto.create({dateOn, photoFile: file.data, typeFile: file.mimetype, tblFaceId});
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res) {
        const {id, dateOn, pathFile, tblFaceId} = req.body; // деструктуризация тела запроса
        const rec = await tblFacePhoto.findByPk(id); // нахожу запись по первичному ключу
        if (!rec)
            return res.json({message: 'record not found'});
        rec.dateOn = dateOn;
        rec.pathFile = pathFile;
        rec.tblFaceId = tblFaceId;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblFacePhoto.findByPk(id);
        return res.json(rec);

    }

    async getAll(req, res) {
        const recordset = await tblFacePhoto.findAll();
        return res.json(recordset);
    }

    async getFile(req, res) {
        const {id} = req.params;
        const rec = await tblFacePhoto.findByPk(id, {
            attributes: ['photoFile']
        });
        return res.json(rec);
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

    delete = async (req, res, next) => {
        const recDeleted = await Crud.delete(req, null, next, tblFacePhoto);
        if (!recDeleted)
            return;
        res.json({message: 'record deleted'})
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new facePhotoController()
