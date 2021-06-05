const ApiError = require('../error/ApiError');

class Crud {
    async create(req, res, next, model) {
        try {
            const rec = await model.create({...req.body});
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next, model) {
        const {id/*, educationLevel, weightEducationLevel*/} = req.body; // деструктуризация тела запроса
        const rec = await model.findByPk(id); // нахожу запись по первичному ключу
        if (!rec)
            next(ApiError.badRequest('record not found'));
        //Object.keys(req.body).filter(i => i !== )
        for (let key in req.body)
            if (req.body.hasOwnProperty(key)) // условие чтобы не перебирать свойство прототипа объекта
                rec[key] = req.body[key]

        try {
            await rec.save();
            return res.json(rec);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req, res, next, model) {
        const {id} = req.params;
        try {
            const rec = await model.findByPk(id);
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next, model, order = null) {
        try {
            const recordset = await model.findAll({
                order: order
            });
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next, model) {
        const {id} = req.params;
        const rec = await model.findByPk(id);
        if (!rec)
            next(ApiError.badRequest('record not found'));
        try {
            await rec.destroy();
            res.json({message: 'record deleted'})
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Crud()