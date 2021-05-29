const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceCitizenshipController = require('../controllers/faceCitizenshipController');

router.post('/', faceCitizenshipController.create);
router.get('/:id', faceCitizenshipController.getOne);
//router.get('/', faceCitizenshipController.getAll);
router.get('/faceId/:faceId', faceCitizenshipController.getAllOneFace);
router.delete('/:id', faceCitizenshipController.delete);
router.put('/', faceCitizenshipController.update);

module.exports = router; // экспорт роутера, используется в файле index