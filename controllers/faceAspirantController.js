const {
    tblFaceAspirant,
    tblDictEducationForm,
    tblDictSubject,
    tblDictSpecialty,
    tblDictNameDirection,
    tblAcademicAdvisor,
    tblDictEnterprise,
    tblFace,
    tblFaceName,
    tblFace_tblOrder,
    tblOrder
} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');
const {isEmptyObj} = require("../utils/utils");
const {stringToBoolean} = require("../utils/utils");
const {Op} = require("sequelize");
//const {takeValuesFromField} = require("../utils/utils");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceAspirantController {
    buildConditionLastRecords = async (params = null) => {
        const lastRecords = await tblFaceAspirant.findAll({
            where: params,
            attributes: [
                'tblFaceId',
                [Sequelize.fn('max', Sequelize.col('dateOn')), 'dateOn']
            ],
            group: 'tblFaceId',
        })

        const buildWhere = (recordset) => {
            let result = [];

            recordset.forEach(i => {
                result.push({[Op.and]: [{tblFaceId: i.tblFaceId}, {dateOn: i.dateOn}]})
            });
            return result;
        }

        return {
            [Op.or]: buildWhere(lastRecords)
        }
    }

    getOnParams = async (params, paramsTblFace = {},
                         paramsTblDictNameDirection = {},
                         paramsTblDictEnterprise = {},
                         paramsTblDictEnterprise2 = {}) => {
        return await tblFaceAspirant.findAll({
            where: params,
            include: [ // это типа соединение JOIN как в SQL
                {
                    model: tblDictEducationForm,
                    attributes: ['educationForm'],
                    required: true,
                },
                {
                    model: tblDictSubject,
                    attributes: ['subject'],
                    required: true,
                },
                {
                    model: tblDictSpecialty,
                    attributes: ['DirectionalityOrSpecialty'],
                    required: true,
                    include: [
                        {
                            model: tblDictNameDirection,
                            attributes: ['nameDirection'],
                            required: !isEmptyObj(paramsTblDictNameDirection),
                            where: paramsTblDictNameDirection
                        },
                        {
                            model: tblDictEnterprise,
                            where: paramsTblDictEnterprise,
                            attributes: ['id', 'name', 'whatIsIt', 'parentId'],
                            required: true,
                            include: [
                                {
                                    model: tblDictEnterprise,
                                    where: paramsTblDictEnterprise2,
                                    required: true,
                                    attributes: ['id', 'name', 'whatIsIt', 'parentId']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: tblAcademicAdvisor,
                    attributes: ['tblFaceId'],
                    required: true,
                    include: [
                        {
                            model: tblFace,
                            attributes: ['birthdate', 'id'],
                            required: true,
                            include: [
                                {
                                    model: tblFaceName,
                                    attributes: ['lastname', 'firstname', 'middleName'],
                                    required: true,
                                    order: [
                                        ['dateOn', 'DESC'] // сортировка по убыванию, чтобы показать последнюю ФИО
                                    ],
                                    limit: 1, // взять у сортированного списка первую запись
                                }
                            ]
                        }
                    ]
                },
                // ниже привязка к приказам
                {
                    model: tblFace_tblOrder,
                    attributes: ['typeRel', 'note', 'id'],
                    include: [
                        {
                            attributes: ['numOrder', 'dateOrder', 'text'],
                            model: tblOrder
                        }
                    ]
                },
                // аспирант - лицо
                {
                    model: tblFace,
                    where: paramsTblFace,
                    required: true, // преобразовывая запрос из значения OUTER JOINпо умолчанию в запрос INNER JOIN
                    include: [
                        {
                            model: tblFaceName,
                            order: [['dateOn', 'DESC']], // сортировка по убыванию, чтобы показать последнюю ФИО
                            limit: 1, // взять у сортированного списка первую запись
                        }
                    ]
                },
            ],
            //order: [['createdAt', 'DESC']],
        });
    }

    create = async (req, res, next) => {
        try {
            const recCreated = await Crud.create(req, null, next, tblFaceAspirant);
            const {face_order} = req.body;
            if (face_order) {
                //если имеются данные о свзи с приказами ,то сохранить эти данные
                if (face_order.hasOwnProperty('arr'))
                    if (face_order.arr.length > 0) {
                        for (const i of face_order.arr) {
                            await tblFace_tblOrder.create({
                                ...i,
                                tblFaceAspirantId: recCreated.id,
                                tblFaceId: recCreated.tblFaceId
                            });
                        }
                    }
            }
            const dataset = await this.getOnParams({id: recCreated.id});
            return res.json(dataset[0]);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    update = async (req, res, next) => {
        const updateRec = await Crud.update(req, null, next, tblFaceAspirant);
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
        const {faceId} = req.params;
        const tblFaceId = isNaN(faceId) ? null : faceId
        try {
            const recordset = await this.getOnParams({tblFaceId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    getAllOneAdvisor = async (req, res, next) => {
        const {advisorId} = req.params;
        const tblAcademicAdvisorId = isNaN(advisorId) ? null : advisorId
        try {
            const recordset = await this.getOnParams({tblAcademicAdvisorId})
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    getAll = async (req, res, next) => { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        try {
            const condition = await this.buildConditionLastRecords();
            const recordset = await this.getOnParams(condition);
            return res.json(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    getByParams = async (req, res, next) => {
        const {
            lastname,
            firstname,
            middleName,
            dd,
            mm,
            yyyy,
            sex,
            isRecommendation,
            isProtocol,
            isAgree,
            isHeadDepartment,
            ddIn,
            mmIn,
            yyyyIn,
            ddOut,
            mmOut,
            yyyyOut,
            dissertationTheme,
            tblDictEducationFormId,
            tblDictNameDirectionId,
            status,
            tblDictSpecialtyId,
            facultyId,
            departmentId,
            tblDictSubjectId,
            tblAcademicAdvisorId,
        } = req.query;

        const paramsTblDictEnterprise = {};
        paramsTblDictEnterprise[Op.and] = [];
        if (departmentId)
            paramsTblDictEnterprise[Op.and].push({id: departmentId});

        const paramsTblDictEnterprise2 = {};
        paramsTblDictEnterprise2[Op.and] = [];
        if (facultyId)
            paramsTblDictEnterprise2[Op.and].push({id: facultyId});

        const paramsForFace = {};
        paramsForFace[Op.and] = [];
        if (sex)
            paramsForFace[Op.and].push({sex: stringToBoolean(sex)})
        if (yyyy)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('birthdate')), yyyy));
        if (mm)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('birthdate')), mm));
        if (dd)
            paramsForFace[Op.and].push(Sequelize.where(Sequelize.fn('DAY', Sequelize.col('birthdate')), dd));

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
            const paramsTblFace = buildWhere(recordset);
            const paramsFaceAspirant = {};
            paramsFaceAspirant[Op.and] = [];
            if (isRecommendation)
                paramsFaceAspirant[Op.and].push({isRecommendation: stringToBoolean(isRecommendation)})
            if (isProtocol)
                paramsFaceAspirant[Op.and].push({isProtocol: stringToBoolean(isProtocol)})
            if (isAgree)
                paramsFaceAspirant[Op.and].push({isAgree: stringToBoolean(isAgree)})
            if (isHeadDepartment)
                paramsFaceAspirant[Op.and].push({isRecommendation: stringToBoolean(isHeadDepartment)})

            if (yyyyIn)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dateOn')), yyyyIn));
            if (mmIn)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dateOn')), mmIn));
            if (ddIn)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('DAY', Sequelize.col('dateOn')), ddIn));

            if (yyyyOut)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dateOff')), yyyyOut));
            if (mmOut)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dateOff')), mmOut));
            if (ddOut)
                paramsFaceAspirant[Op.and].push(Sequelize.where(Sequelize.fn('DAY', Sequelize.col('dateOff')), ddOut));

            if (dissertationTheme)
                paramsFaceAspirant[Op.and].push({dissertationTheme: {[Op.like]: `${dissertationTheme}%`}})

            if (tblDictEducationFormId)
                paramsFaceAspirant[Op.and].push({tblDictEducationFormId});

            if (tblDictSpecialtyId)
                paramsFaceAspirant[Op.and].push({tblDictSpecialtyId});

            if (tblDictSubjectId)
                paramsFaceAspirant[Op.and].push({tblDictSubjectId});

            if (tblAcademicAdvisorId)
                paramsFaceAspirant[Op.and].push({tblAcademicAdvisorId});
            //paramsFaceAspirant[Op.and].push(await this.buildConditionLastRecords()); // последние записи в аспиранте выбирать. подумал вдруг можно быть аспирантов в двух местах поэтому закоментил
            // свитч решает каких показывать действующих , исключенных или всех
            switch (status) {
                case 'active':
                    paramsFaceAspirant[Op.and].push({
                        dateOff: {
                            [Op.or]: {
                                [Op.is]: null,
                                [Op.gte]: new Date()
                            }
                        }
                    });
                    break;
                case 'deleted':
                    paramsFaceAspirant[Op.and].push(
                        {
                            dateOff: {
                                [Op.lt]: new Date()
                            }
                        });
                    break;
                default:
                    break;
            }

            const paramsDictNameDirection = {};
            if (tblDictNameDirectionId)
                paramsDictNameDirection.id = tblDictNameDirectionId;

            const recordset2 = await this.getOnParams(
                paramsFaceAspirant,
                paramsTblFace,
                paramsDictNameDirection,
                paramsTblDictEnterprise,
                paramsTblDictEnterprise2);
            return res.json(recordset2);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }


    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceAspirant)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceAspirantController()