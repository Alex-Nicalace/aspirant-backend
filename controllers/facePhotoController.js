const path = require('path'); //  утилиты для работы с путями к файлам и каталогам
const uuid = require('uuid'); // генеарция уникальных имен
const fs = require('fs');

const ApiError = require('../error/ApiError');
const {tblFacePhoto} = require('../models/models');
const Crud = require('./Crud');


// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class facePhotoController {
    getOnParams = async (params) => {
        return await tblFacePhoto.findAll({
            where: params
        })
    }

    async create(req, res, next) {
        try {
            const {dateOn, tblFaceId} = req.body;// т.к. это post запрос то у него body
            const {file} = req.files; // получаю файл из тела запроса
            let fileName = uuid.v4() + '.jpg'; // необходимо сгенерить уникальное имя
            await file.mv(
                path.resolve( //path.resolve - адаптирует указанный путь к ОС
                    __dirname, // __dirname - путь до текущей папки с контроллерами
                    '..', // .. - вернцться на директории выше
                    'static', // место куда переместить файл
                    fileName // новое имя файла
                ))
            const rec = await tblFacePhoto.create({dateOn, pathFile: fileName, tblFaceId});
            return res.json(rec);
        } catch (e){
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

        const pathFile = path.resolve( //path.resolve - адаптирует указанный путь к ОС
            __dirname, // __dirname - путь до текущей папки с контроллерами
            '..', // .. - вернцться на директории выше
            'static', // место куда переместить файл
            recDeleted.pathFile // новое имя файла
        );

        fs.unlinkSync(pathFile);

        res.json({message: 'record deleted'})
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new facePhotoController()
