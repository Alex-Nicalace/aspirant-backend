//'use strict';
const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const Controller = require('../controllers/dictEnterpriseController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), Controller.create);
router.get('/', Controller.getAllWithJoinedName);
//router.get('/test', Controller.getAllWithJoinedName);
router.get('/:id', Controller.getOne);
router.delete('/:id', checkRole('canDelete'), Controller.delete);
router.put('/', checkRole('canUpdate'), Controller.update);

module.exports = router; // экспорт роутера, используется в файле index