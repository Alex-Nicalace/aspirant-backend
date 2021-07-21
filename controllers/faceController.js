const {tblFace, tblFaceName} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют

class FaceController {
    takeValuesFromField = function (arr, nameField) {
        return arr.map(i => {
            return i[nameField]
        })
    }

    _getOneWithName = async (id) => {
        // select one face with last name
            return await tblFaceName.findAll({
                attributes: [
                    [Sequelize.col('tblFace.id'), 'id'],
                    [Sequelize.col('tblFace.birthdate'), 'birthdate'],
                    [Sequelize.col('tblFace.createdAt'), 'createdAt'],
                    [Sequelize.col('tblFace.updatedAt'), 'updatedAt'],
                    'lastname', 'firstname', 'middleName',
                    [Sequelize.col('tblFaceName.dateOn'), 'nameDateOn'],
                    [Sequelize.col('tblFaceName.id'), 'faceNameId'],
                ],
                where: {
                    tblFaceId: id
                },
                order: [
                    ['dateOn', 'DESC'] // сортировка по убыванию, чтобы показать последнюю ФИО
                ],
                limit: 1, // взять у сортированного списка первую запись
                include: [
                    {
                        model: tblFace,
                        attributes: [],
                        required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    }
                ]
            })
    }

    async create(req, res, next) {
        await Crud.create(req, res, next, tblFace)
    }

    createFaceWithName = async (req, res, next) => {
        const {birthdate, sex, lastname, firstname, middleName} = req.body;

        try {
            // СИНТКАСИСС вставки пляска от зависимой таблицы
            // const rec = await tblFaceName.create({
            //         lastname, firstname, middleName, dateOn: birthdate,
            //         tblFace: {birthdate, sex, }
            //
            //     }, {
            //         include: [{
            //             model: tblFace,
            //         }]
            //     }
            // )

            // СИНТКАСИСС вставка пляска от главной таблицы
            const recCreated = await tblFace.create({
                birthdate,
                sex,
                tblFaceNames: [{lastname, firstname, middleName, dateOn: birthdate}] //tblFaceNames название таблицы в СУБД
            }, {
                include: [tblFaceName]
            });

            const recCreatedWithName = await this._getOneWithName(recCreated.dataValues.id);
            if (!recCreatedWithName)
                return next(ApiError.internal('После создания лица не удается выбрать это лицо с ФИО!'))

            // recCreated это грубя говоря объект - созданная запись
            // recCreatedWithName это массив объектов - датасет. но известно что запись должна быть одной поэтому вы
            // бираю первый элемент масива

            return res.json(recCreatedWithName[0]); //т.к. ожидается одна сущность то это объект зачем массив
        } catch (e) {
            res.json(e);
        }
    }


    async update(req, res, next) {
        await Crud.update(req, res, next, tblFace)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFace)

    }

    getOneWithName = async (req, res, next) => {
        const {id} = req.params;
        try {
            const recordset = await this._getOneWithName(id)
            return res.json(recordset[0]); //т.к. ожидается одна сущность то это объект зачем массив
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

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

    getAll = async (req, res, next) => {
        try {
            const recordset = await tblFaceName.findAll({
                attributes: [
                    'tblFaceId', //'lastName',
                    [Sequelize.fn('max', Sequelize.col('dateOn')), 'dateOn']
                ],
                group: 'tblFaceId',
            })
                .then(lastNames => {
                    return tblFaceName.findAll({
                        attributes: [
                            [Sequelize.col('tblFace.id'), 'id'],
                            [Sequelize.col('tblFace.birthdate'), 'birthdate'],
                            [Sequelize.col('tblFace.createdAt'), 'createdAt'],
                            [Sequelize.col('tblFace.updatedAt'), 'updatedAt'],
                            'lastname', 'firstname', 'middleName',
                            [Sequelize.col('tblFaceName.dateOn'), 'nameDateOn'],
                            [Sequelize.col('tblFaceName.id'), 'faceNameId'],
                        ],
                        where: {
                            [Op.and]: [
                                {tblFaceId: {[Op.in]: this.takeValuesFromField(lastNames, 'tblFaceId')}},
                                {dateOn: {[Op.in]: this.takeValuesFromField(lastNames, 'dateOn')}}],
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
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFace)
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceController()