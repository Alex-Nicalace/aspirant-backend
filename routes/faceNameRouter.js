const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceNameController = require('../controllers/faceNameController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), faceNameController.create);
router.get('/:id', faceNameController.getOne);
router.get('/faceId/:faceId', faceNameController.getAllNamesOneFace);
router.put('/', checkRole('canUpdate'), faceNameController.update);
router.delete('/:id', checkRole('canDelete'), faceNameController.delete);

module.exports = router; // экспорт роутера, используется в файле index