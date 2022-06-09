const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const facePhotoController = require('../controllers/facePhotoController');
const checkRole = require("../middleware/checkRoleMiddleware");

// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер

router.post('/', checkRole('canInsert'), facePhotoController.create);
router.get('/', facePhotoController.getAll);
router.get('/faceId/:faceId', facePhotoController.getAllOneFace);
router.get('/photoId/:id', facePhotoController.getFile);
router.get('/:id', facePhotoController.getOne);
router.delete('/:id', checkRole('canDelete'), facePhotoController.delete);
router.put('/', checkRole('canUpdate'), facePhotoController.update);

module.exports = router; // экспорт роутера, используется в файле index