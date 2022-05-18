const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictCityController = require('../controllers/dictCityController');
const checkRole = require("../middleware/checkRoleMiddleware"); //импорт логики роутера (хранится в контроллерах)

router.post('/', checkRole('canInsert'), dictCityController.create);
router.get('/', dictCityController.getAll);
router.get('/:id', dictCityController.getOne);
router.delete('/:id', checkRole('canDelete'), dictCityController.delete);
router.put('/', checkRole('canUpdate'), dictCityController.update);

module.exports = router; // экспорт роутера, используется в файле index