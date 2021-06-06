const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceWorkController = require('../controllers/faceWorkController');

router.post('/', faceWorkController.create);
router.get('/:id', faceWorkController.getOne);
router.get('/faceId/:faceId', faceWorkController.getAllOneFace);
router.put('/', faceWorkController.update);
router.delete('/:id', faceWorkController.delete);

module.exports = router; // экспорт роутера, используется в файле index