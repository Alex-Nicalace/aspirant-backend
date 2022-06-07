const {tblOrder} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const path = require('path');
const fs = require("fs"); //  утилиты для работы с путями к файлам и каталогам
const db = require('../db');
const {dateToFormatISO} = require("../utils/utils");
const {stringToBoolean} = require("../utils/utils");

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
            let newFileName = null;

            if (req.files) {
                const {file} = req.files;
                const fileName = `${dateToFormatISO(dateOrder)}_№_${numOrder}`
                const fileExt = file.name.split('.').pop();
                newFileName = fileName + '.' + fileExt;
                const pathOrders = path.resolve(__dirname, '..', 'static', 'orders')
                if (!fs.existsSync(pathOrders)) {
                    fs.mkdirSync(pathOrders, { recursive: true })
                }
                await file.mv(
                    path.resolve( pathOrders, // место куда переместить файл
                        newFileName // имя файла на клиенте
                    ), err => {
                        if (err) {
                            return next(ApiError.internal('не удалось сохранить файл'))
                        }
                    });
            }

            const pathFile = newFileName ? `/orders/${newFileName}` : null

            const rec = await tblOrder.create({numOrder, dateOrder, text, pathFile});

            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        const pathOrders = path.resolve(__dirname, '..', 'static', 'orders')
        if (!fs.existsSync(pathOrders)) {
            fs.mkdirSync(pathOrders, { recursive: true })
        }
        let transaction;
        try {
            // открыть транзакцию
            transaction = await db.transaction();
            const {id, numOrder, dateOrder, text, isDeleteFile: isDeleteF} = req.body;
            let isDeleteFile = stringToBoolean(isDeleteF);
            // найти редактируемую запись
            const rec = await tblOrder.findByPk(id); // нахожу запись по первичному ключу
            if (!rec)
                next(ApiError.badRequest('record not found'));
            let fileName;
            const dateNumberOrder = `${dateToFormatISO(dateOrder)}_№_${numOrder}`
            // проверить есть ли файл
            if (req.files) {
                // если пришел файл то сгенерить имя из даты и расширения файла
                fileName = dateNumberOrder;
                const ext = req.files.file.name.split('.').pop();
                fileName = fileName + (ext ? `.${ext}` : '');
                isDeleteFile = false;
            } else if (rec.pathFile) {
                // если нет файла, то сгенрить имя для переименованя файла
                fileName = dateNumberOrder;
                const ext = rec.pathFile.split('.').pop();
                fileName = fileName + (ext ? `.${ext}` : '');
            }

            const newRecord = {numOrder, dateOrder, text};
            if (fileName) {
                newRecord.pathFile = `/orders/${fileName}`;
            }
            if (isDeleteFile === true) {
                // если есть признак удалить файл то чистить полея ссылки на файл
                newRecord.pathFile = null;
            }

            await tblOrder.update({...newRecord}, {where: {id}, transaction})

            if (isDeleteFile === true) {
                if (rec.pathFile) {
                    const pathFile = path.resolve( //path.resolve - адаптирует указанный путь к ОС
                        __dirname, // __dirname - путь до текущей папки с контроллерами
                        '..', // .. - вернцться на директории выше
                        'static', // место куда переместить файл
                        rec.pathFile // новое имя файла
                    );
                    await fs.access(pathFile, fs.F_OK, (err) => {
                        if (err) {
                            return
                        }
                        fs.unlinkSync(pathFile);
                    })
                }
            } else if (req.files) {
                const {file} = req.files;
                if (rec.pathFile) {
                    const pathFile = path.resolve( //path.resolve - адаптирует указанный путь к ОС
                        __dirname, // __dirname - путь до текущей папки с контроллерами
                        '..', // .. - вернцться на директории выше
                        'static', // место куда переместить файл
                        rec.pathFile // новое имя файла
                    );
                    await fs.access(pathFile, fs.F_OK, (err) => {
                        if (err) {
                            return
                        }
                        fs.unlinkSync(pathFile);
                    })
                }
                await file.mv(
                    path.resolve(pathOrders, // место куда переместить файл
                        fileName // имя файла на клиенте
                    ), err => {
                        if (err) {
                            return next(ApiError.internal('не удалось сохранить файл'))
                        }
                    });
            } else if (rec.pathFile && (fileName !== rec.pathFile.split('.')[0].split('/')[1])) {
                //newFileName = `${fileName}.${rec.pathFile.split('.').pop()}`
                fs.rename(
                    path.resolve(__dirname, '..', 'static', rec.pathFile),
                    path.resolve(pathOrders, fileName),
                    (err) => {
                        if (err)
                            return next(ApiError.badRequest('не удалось переименовать файл приказа согласно реквизитам приказа'))
                    })
            }
            await transaction.commit();
            const recInserted = await tblOrder.findByPk(id); // нахожу запись по первичному ключу
            return res.json(recInserted);
        } catch (e) {
            if (transaction) await transaction.rollback();
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
            if (rec.pathFile) {
                const pathFile = path.resolve( //path.resolve - адаптирует указанный путь к ОС
                    __dirname, // __dirname - путь до текущей папки с контроллерами
                    '..', // .. - вернцться на директории выше
                    'static/', // место куда переместить файл
                    rec.pathFile // новое имя файла
                );
                await fs.access(pathFile, fs.F_OK, (err) => {
                    if (err) {
                        return
                    }
                    fs.unlinkSync(pathFile);
                });
            }

            await rec.destroy();
            //res.json({message: 'record deleted'})
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new Controller()