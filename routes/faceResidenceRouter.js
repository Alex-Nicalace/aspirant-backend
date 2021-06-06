const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/faceResidenceController');

router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.get('/faceId/:faceId', controller.getAllOneFace);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

module.exports = router; // экспорт роутера, используется в файле index