//'use strict';
const {tblDictEnterprise} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');
const {Sequelize} = require("sequelize");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictEnterpriseController {
    async create(req, res, next) {
        //const rec = await model.create({...req.body});
        // const {parentId} = req.body;
        // typeof(parentId) !== 'number' && (req.body.parentId = null)
        await Crud.create(req, res, next, tblDictEnterprise);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictEnterprise);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictEnterprise);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictEnterprise);
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