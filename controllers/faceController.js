const {tblFace} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const {tblFaceName} = require("../models/models");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceController {
    async create(req, res) {
        const {birthdate} = req.body;
        // т.к. это post запрос то у него body
        const rec = await tblFace.create({birthdate});
        return res.json(rec);
    }

    async update(req, res) {
        const {id, birthdate} = req.body; // деструктуризация тела запроса
        const rec = await tblFace.findByPk(id); // нахожу запись по первичному ключу
        if (!rec)
            return res.json({message: 'record not found'});
        rec.birthdate = birthdate;
        await rec.save();
        return res.json(rec);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const rec = await tblFace.findByPk(id);
        return res.json(rec);

    }

    async getAll(req, res) {
        const recordset = await tblFace.findAll({
            attributes: [
                'id', 'birthdate', 'createdAt', 'updatedAt',
                //[Sequelize.col('tblFaceName.lastname'), 'lastname'] // указание поля из связной таблицы
            ],
            include:[
                {
                    model: tblFaceName,
                    //required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    order: [ [ 'dateOn', 'DESC' ] ], // сортировка по убыванию, чтобы показать последнюю ФИО
                    limit: 1, // взять у сортированного списка первую запись
                    //attributes: ['lastname'],

                }
            ]
        });
        return res.json(recordset);
    }

    async delete(req, res) {
        const {id} = req.params;
        const rec = await tblFace.findByPk(id);
        //await tblDictCountry.destroy(rec);
        await rec.destroy();
        res.json({message: 'record deleted'})
    }

    // async getAllNamesOneFace(req, res) {
    //     const {id} = req.params;
    //     const recordset = await tblFace.findAll({
    //         where: {
    //             tblFaceId: id
    //         }
    //     });
    //     return res.json(recordset);
    // }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceController()