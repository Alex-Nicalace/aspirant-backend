const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/faceContactsController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), controller.create);
router.get('/:id', controller.getOne);
router.get('/faceId/:faceId', controller.getAllOneFace);
router.put('/', checkRole('canUpdate'), controller.update);
router.delete('/:id', checkRole('canDelete'), controller.delete);

module.exports = router; // экспорт роутера, используется в файле index