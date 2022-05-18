const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceWorkController = require('../controllers/faceWorkController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), faceWorkController.create);
router.get('/:id', faceWorkController.getOne);
router.get('/faceId/:faceId', faceWorkController.getAllOneFace);
router.put('/', checkRole('canUpdate'), faceWorkController.update);
router.delete('/:id', checkRole('canDelete'), faceWorkController.delete);

module.exports = router; // экспорт роутера, используется в файле index