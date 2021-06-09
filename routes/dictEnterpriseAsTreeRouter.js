//'use strict';
const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const Controller = require('../controllers/dictEnterpriseController');

router.get('/', Controller.getTreeAll);
router.get('/:id', Controller.getTreeBranch);


module.exports = router; // экспорт роутера, используется в файле index