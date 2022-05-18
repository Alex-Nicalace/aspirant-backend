const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceCitizenshipController = require('../controllers/faceCitizenshipController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), faceCitizenshipController.create);
router.get('/:id', faceCitizenshipController.getOne);
//router.get('/', faceCitizenshipController.getAll);
router.get('/faceId/:faceId', faceCitizenshipController.getAllOneFace);
router.delete('/:id', checkRole('canDelete'), faceCitizenshipController.delete);
router.put('/', checkRole('canUpdate'), faceCitizenshipController.update);

module.exports = router; // экспорт роутера, используется в файле index