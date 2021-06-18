const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const Controller = require('../controllers/faceExaminationsController');

router.post('/', Controller.create);
router.get('/:id', Controller.getOne);
router.get('/faceId/:faceId', Controller.getAllOneFace);
router.put('/', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router; // экспорт роутера, используется в файле index