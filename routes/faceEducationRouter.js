const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceEducationController = require('../controllers/faceEducationController');

router.post('/', faceEducationController.create);
router.get('/:id', faceEducationController.getOne);
router.get('/faceId/:faceId', faceEducationController.getAllOneFace);
router.put('/', faceEducationController.update);
router.delete('/:id', faceEducationController.delete);

module.exports = router; // экспорт роутера, используется в файле index