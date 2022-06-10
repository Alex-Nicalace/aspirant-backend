const {tblOrder} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class Controller {
    getOnParams = async (params) => {
        return await tblOrder.findAll({
            where: params,
        })
    }

    async create(req, res, next) {
        try {
            const {numOrder, dateOrder, text} = req.body;
            const orderFile = req.files?.file.data;
            const typeFile = req.files?.file.mimetype

            const rec = await tblOrder.create({numOrder, dateOrder, text, orderFile, typeFile});

            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id, numOrder, dateOrder, text} = req.body;
            const {file} = req.files;
            const orderFile = file?.data;
            const typeFile = file?.mimetype

            await tblOrder.update({numOrder, dateOrder, text, orderFile, typeFile}, {where: {id}})
            const recInserted = await tblOrder.findByPk(id);

            return res.json(recInserted);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblOrder)

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblOrder, [['dateOrder', 'ASC']])
    }

    getByParams = async (req, res, next) => {
        const {numOrder, dd, mm, yyyy, text} = req.query;

        const params = {}
        params[Op.and] = [];
        numOrder && params[Op.and].push({numOrder})
        dd && params[Op.and].push(Sequelize.where(Sequelize.fn('DAY', Sequelize.col('dateOrder')), dd));
        mm && params[Op.and].push(Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dateOrder')), mm));
        yyyy && params[Op.and].push(Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dateOrder')), yyyy));
        text && params[Op.and].push({text: {[Op.like]: `%${text}%`}})

        try {
            const recordset = await this.getOnParams(params);
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        const rec = await tblOrder.findByPk(id);
        if (!rec)
            next(ApiError.badRequest('record not found'));

        try {
            await rec.destroy();
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()