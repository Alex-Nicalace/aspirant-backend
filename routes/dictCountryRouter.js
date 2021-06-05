const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictCountryController = require('../controllers/dictCountryController'); //импорт логики роутера (хранится в контроллерах)

router.post('/', dictCountryController.create);
router.get('/', dictCountryController.getAll);
router.get('/:id', dictCountryController.getOne);
router.delete('/:id', dictCountryController.delete);
router.put('/', dictCountryController.update);

module.exports = router; // экспорт роутера, используется в файле index