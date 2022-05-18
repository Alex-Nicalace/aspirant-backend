//'use strict';
const {tblDictEnterprise} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictEnterpriseController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictEnterprise);
    }

    async update(req, res, next) {
        const {id, parentId} = req.body;
        if (id === parentId)
            return next(ApiError.badRequest('Нарушение логики структуры!'));
        await Crud.update(req, res, next, tblDictEnterprise);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictEnterprise);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictEnterprise);
    }

    getFullName = async(id, str = null) => {
        //let result = '';
        const t = await tblDictEnterprise.findByPk(id);
        const patentId = t.parentId;
        const result =  (str ? str + ', ' : '')   + t.name
        if (patentId) {
            return await this.getFullName(patentId, result)
        }
        return result
    }

    getAllWithJoinedName = async (req, res, next) => {
        try {
            const recordset = await Crud.getAll(req, null, next, tblDictEnterprise);
            // const jsonString = JSON.stringify(recordset);
            // const obj = JSON.parse(jsonString);
            const recordsetMod = await Promise.all(recordset.map(async (i) => {
                const joinedName = await this.getFullName(i.dataValues.id)
                return {...i.dataValues, joinedName}
            }))
            //console.log(tst);
            return res.json(recordsetMod);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    getBranch = async (id) => {
        const res = (await tblDictEnterprise.findAll({
            where: {
                parentId: id
            },
        }));

        let m = [];
        for (let i = 0; i <= res.length - 1; i++) {
            const children = await this.getBranch(res[i].id)
            m.push({...res[i].dataValues, children})
        }
        return m
    }

    getTreeBranch = async (req, res, next) => { // если неьбходимо выести указанную ветку
        const {id} = req.params;
        try {
            const rec = await tblDictEnterprise.findByPk(id) // нахожу запись с указанным id
            const recordset = {...rec.dataValues, children: await this.getBranch(id)};
            res.send(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

        // try {
        //     const recordset = await tblDictEnterprise.findAll({
        //         where: {
        //             parentId: null
        //         },
        //         include: [{
        //             model: tblDictEnterprise,
        //             as: 'children'
        //         }]
        //     });
        //     res.send(recordset);
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }
    }

    getTreeAll = async (req, res, next) => { // если необходимо вывести все дерево
        try {
            const recordset = await this.getBranch(null); //await this.getFullName(6)
            res.send(recordset);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictEnterprise);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictEnterpriseController()