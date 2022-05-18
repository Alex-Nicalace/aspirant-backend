const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceController = require('../controllers/faceController');
const checkRole = require("../middleware/checkRoleMiddleware");

// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер

router.post('/', checkRole('canInsert'), faceController.createFaceWithName);
router.get('/', faceController.getByParams);
//router.get('/by-params/', faceController.getByParams);
router.get('/:id', faceController.getOneWithName);
router.delete('/:id', checkRole('canDelete'), faceController.delete);
router.put('/', checkRole('canUpdate'), faceController.update);
//router.get('/names/:id', faceController.getAllNamesOneFace)


module.exports = router; // экспорт роутера, используется в файле index