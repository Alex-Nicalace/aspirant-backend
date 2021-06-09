//'use strict';
const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const Controller = require('../controllers/dictEnterpriseController');

router.post('/',Controller.create);
router.get('/', Controller.getAll);
router.get('/:id', Controller.getOne);
router.delete('/:id', Controller.delete);
router.put('/', Controller.update);

module.exports = router; // экспорт роутера, используется в файле index