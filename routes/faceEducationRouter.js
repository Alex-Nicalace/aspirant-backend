const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceEducationController = require('../controllers/faceEducationController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), faceEducationController.create);
router.get('/:id', faceEducationController.getOne);
router.get('/faceId/:faceId', faceEducationController.getAllOneFace);
router.put('/', checkRole('canUpdate'), faceEducationController.update);
router.delete('/:id', checkRole('canDelete'), faceEducationController.delete);

module.exports = router; // экспорт роутера, используется в файле index