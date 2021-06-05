const {tblFace} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const {tblFaceName} = require("../models/models");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFace)
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFace)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFace)

    }

/*    async getAll(req, res) {
        const recordset = await tblFace.findAll({
            attributes: [
                'id', 'birthdate', 'createdAt', 'updatedAt',
                //[Sequelize.col('tblFaceName.lastname'), 'lastname'] // указание поля из связной таблицы
            ],
            include: [
                {
                    model: tblFaceName,
                    //required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                    limit: 1, // взять у сортированного списка первую запись
                    //attributes: ['lastname'],

                }
            ]
        });
        return res.json(recordset);
    }*/

    async getAll(req, res) {
        const takeValuesFromField = (arr, nameField) => {
            return arr.map(i => {
                return i[nameField]
            })
        }

        const recordset = await tblFaceName.findAll({
            attributes: [
                'tblFaceId', //'lastName',
                [Sequelize.fn('max', Sequelize.col('dateOn')), 'dateOn']
            ],
            group: 'tblFaceId',
        })
            .then(lastNames => {
                return tblFaceName.findAll({
                    attributes:[
                        [Sequelize.col('tblFace.id'), 'id'],
                        [Sequelize.col('tblFace.birthdate'), 'birthdate'],
                        [Sequelize.col('tblFace.createdAt'), 'createdAt'],
                        [Sequelize.col('tblFace.updatedAt'), 'updatedAt'],
                        'lastname', 'firstname', 'middleName', 'dateOn'
                    ],
                    where: {
                        [Op.and]: [
                            {tblFaceId: {[Op.in]: takeValuesFromField(lastNames, 'tblFaceId')}},
                            {dateOn: {[Op.in]: takeValuesFromField(lastNames, 'dateOn')}}],
                    },
                    include: [
                        {
                            model: tblFace,
                            attributes: [],
                            required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                        }
                    ]
                })
            })
        return res.json(recordset);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFace)
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new faceController()