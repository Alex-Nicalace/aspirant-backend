const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/faceOrderController');
const checkRole = require("../middleware/checkRoleMiddleware");

// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер

router.post('/', checkRole('canInsert'), controller.create);
router.get('/', controller.getAll);
router.get('/faceId/:faceId', controller.getAllOneFace);
router.get('/orderId/:orderId', controller.getAllOneOrder);
router.get('/faceAspirantId/:faceAspirantId', controller.getAllOneRecFaceAspirant);
router.get('/:id', controller.getOne);
router.delete('/:id', checkRole('canDelete'), controller.delete);
router.put('/', checkRole('canUpdate'), controller.update);


module.exports = router; // экспорт роутера, используется в файле index