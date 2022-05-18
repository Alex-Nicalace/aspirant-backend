const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictEducationLevelController = require('../controllers/dictEducationLevelController');
const checkRole = require("../middleware/checkRoleMiddleware"); //импорт логики роутера (хранится в контроллерах)

router.post('/', checkRole('canInsert'), dictEducationLevelController.create);
router.get('/', dictEducationLevelController.getAll);
router.get('/:id', dictEducationLevelController.getOne);
router.delete('/:id', checkRole('canDelete'), dictEducationLevelController.delete);
router.put('/', checkRole('canUpdate'), dictEducationLevelController.update);

module.exports = router; // экспорт роутера, используется в файле index