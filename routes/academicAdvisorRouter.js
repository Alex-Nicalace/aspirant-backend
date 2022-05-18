const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const Controller = require('../controllers/academicAdvisorController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), Controller.create);
router.get('/', Controller.getAllFace);
router.get('/:id', Controller.getOne);
router.get('/faceId/:faceId', Controller.getAllOneFace);
router.put('/', checkRole('canUpdate'), Controller.update);
router.delete('/:id', checkRole('canDelete'), Controller.delete);

module.exports = router; // экспорт роутера, используется в файле index