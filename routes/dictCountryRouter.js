const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictCountryController = require('../controllers/dictCountryController');
const checkRole = require("../middleware/checkRoleMiddleware"); //импорт логики роутера (хранится в контроллерах)

router.post('/', checkRole('canInsert'), dictCountryController.create);
router.get('/', dictCountryController.getAll);
router.get('/:id', dictCountryController.getOne);
router.delete('/:id', checkRole('canDelete'), dictCountryController.delete);
router.put('/', checkRole('canUpdate'), dictCountryController.update);

module.exports = router; // экспорт роутера, используется в файле index