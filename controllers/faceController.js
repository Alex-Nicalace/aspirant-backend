const {tblFace, tblFaceName, tblAcademicAdvisor, tblFaceAspirant, tblFacePhoto} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');
const {stringToBoolean} = require("../utils/utils");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют

class FaceController {
    // takeValuesFromField = function (arr, nameField) {
    //     return arr.map(i => {
    //         return i[nameField]
    //     })
    // }

    getOnParams = async (params) => {
        return await tblFace.findAll({
            where: params,
            include: [
                {
                    model: tblFaceName,
                    //required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                    limit: 1, // взять у сортированного списка первую запись
                    //attributes: ['lastname'],
                },
                {
                    attributes: [
                        'dateOn', 'dateOff',
                    ],
                    model: tblFaceAspirant,
                    order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                    limit: 1, // взять у сортированного списка первую запись
                },
                {
                    model: tblAcademicAdvisor,
                },
                {
                    model: tblFacePhoto,
                    order: [['dateOn', 'DESC']],
                    limit: 1,
                    attributes: ['photoFile']
                }
            ]
        })
    }

    // _getOneWithName = async (id) => {
    //     // select one face with last name
    //     return await tblFaceName.findAll({
    //         // attributes: [
    //         //     [Sequelize.col('tblFace.id'), 'id'],
    //         //     [Sequelize.col('tblFace.birthdate'), 'birthdate'],
    //         //     [Sequelize.col('tblFace.createdAt'), 'createdAt'],
    //         //     [Sequelize.col('tblFace.updatedAt'), 'updatedAt'],
    //         //     'lastname', 'firstname', 'middleName',
    //         //     [Sequelize.col('tblFaceName.dateOn'), 'nameDateOn'],
    //         //     [Sequelize.col('tblFaceName.id'), 'faceNameId'],
    //         // ],
    //         where: {
    //             tblFaceId: id
    //         },
    //         order: [
    //             ['dateOn', 'DESC'] // сортировка по убыванию, чтобы показать последнюю ФИО
    //         ],
    //         limit: 1, // взять у сортированного списка первую запись
    //         include: [
    //             {
    //                 model: tblFace,
    //                 //attributes: [],
    //                 required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
    //                 include: [
    //                     {
    //                         attributes: [
    //                             'dateOn','dateOff',
    //                         ],
    //                         model: tblFaceAspirant,
    //                         order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
    //                         limit: 1, // взять у сортированного списка первую запись
    //                     },
    //                     {
    //                         model: tblAcademicAdvisor,
    //                     }
    //                 ]
    //             }
    //         ]
    //     })
    // }

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

            const recCreatedWithName = await this.getOnParams({id: recCreated.dataValues.id});
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


    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFace);
        try {
            const dataset = await this.getOnParams({id: updateRec.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFace)

    }

    getOneWithName = async (req, res, next) => {
        const {id} = req.params;
        try {
            const recordset = await this.getOnParams({id})
            return res.json(recordset[0]); //т.к. ожидается одна сущность то это объект зачем массив
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    getAll = async (req, res, next) => {
        try {
            const recordset = await this.getOnParams();
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getByParams = async (req, res, next) => {
        const {lastname, firstname, middleName, dd, mm, yyyy, sex} = req.query;
        const paramsForFace = {};
        paramsForFace[Op.and] = [];
        if (sex)
            paramsForFace[Op.and].push({sex: stringToBoolean(sex)})
        if (yyyy)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.literal('EXTRACT(YEAR FROM "birthdate")'), yyyy));
        if (mm)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.literal('EXTRACT(MONTH FROM "birthdate")'), mm));
        if (dd)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.literal('EXTRACT(DAY FROM "birthdate")'), dd));

        const paramsForFaceName = {};
        if (lastname)
            paramsForFaceName.lastname = {[Op.like]: `${lastname}%`}
        if (firstname)
            paramsForFaceName.firstname = {[Op.like]: `${firstname}%`}
        if (middleName)
            paramsForFaceName.middleName = {[Op.like]: `${middleName}%`}

        const buildWhere = (recordset) => {
            let result = [];

            recordset.forEach(i => {
                result.push({[Op.and]: [{id: i.id}]})
            });
            return {
                [Op.or]: result
            }
        }

        try {
            const recordset = await tblFace.findAll({
                where: paramsForFace,
                include: [
                    {
                        attributes: [],
                        model: tblFaceName,
                        required: true,
                        where: paramsForFaceName
                    },
                ]
            })
            //return res.json(recordset);
            const params = buildWhere(recordset);
            const recordset2 = await this.getOnParams(params);
            return res.json(recordset2);
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

    // getAll = async (req, res, next) => {
    //     try {
    //         const buildWhere = (recordset) => {
    //             let result = [];
    //
    //             recordset.forEach(i => {
    //                 result.push({[Op.and]: [{tblFaceId: i.tblFaceId}, {dateOn: i.dateOn}]})
    //             });
    //             return {
    //                 [Op.or]: result
    //             }
    //         }
    //
    //         const lastNamesRecordset = await tblFaceName.findAll({
    //             attributes: [
    //                 'tblFaceId', //'lastName',
    //                 [Sequelize.fn('max', Sequelize.col('dateOn')), 'dateOn']
    //             ],
    //             group: 'tblFaceId',
    //         })
    //
    //         const recordset = await tblFaceName.findAll({
    //             // attributes: {
    //             //     attributes: [
    //             //         [Sequelize.col('tblFace.id'), 'id'],
    //             //         [Sequelize.col('tblFace.birthdate'), 'birthdate'],
    //             //         [Sequelize.col('tblFace.createdAt'), 'createdAt'],
    //             //         [Sequelize.col('tblFace.updatedAt'), 'updatedAt'],
    //             //         'lastname', 'firstname', 'middleName',
    //             //         [Sequelize.col('tblFaceName.dateOn'), 'nameDateOn'],
    //             //         [Sequelize.col('tblFaceName.id'), 'faceNameId'],
    //             //         // [Sequelize.literal('(SELECT COUNT(*) ' +
    //             //         //     '  FROM tblFaceAspirants AS aspirant ' +
    //             //         //     '  WHERE aspirant.tblFaceId = tblFace.id)'), 'tst'],
    //             //         // [Sequelize.literal('tblFaceAspirant.id'), 'tst2']
    //             //     ],
    //             // },
    //             where: buildWhere(lastNamesRecordset),
    //             include: [
    //                 {
    //                     model: tblFace,
    //                     //attributes: ['id', ''],
    //                     required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
    //                     include: [
    //                         {
    //                             attributes: [
    //                                 'dateOn','dateOff',
    //                             ],
    //                             model: tblFaceAspirant,
    //                             order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
    //                             limit: 1, // взять у сортированного списка первую запись
    //                         },
    //                         {
    //                             model: tblAcademicAdvisor,
    //                         }
    //                     ]
    //                 },
    //
    //             ]
    //         })
    //         return res.json(recordset);
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message));
    //     }
    // }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFace)
    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceController()