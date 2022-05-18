const {tblFaceAspirantAcadem, tblOrder} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceAspirantAcademController {
    getOnParams = async (params) => {
        return await tblFaceAspirantAcadem.findAll({
            where: params,
            include: [
                {
                    model: tblOrder
                }
            ]
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceAspirantAcadem);
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceAspirantAcadem);
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

    getAllOneFace = async (req, res, next) => {
        const {faceId: tblFaceId} = req.params;
        try {
            const recordset = await this.getOnParams({tblFaceId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceAspirantAcadem)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceAspirantAcadem)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceAspirantAcademController()