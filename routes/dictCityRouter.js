const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictCityController = require('../controllers/dictCityController'); //импорт логики роутера (хранится в контроллерах)

router.post('/', dictCityController.create);
router.get('/', dictCityController.getAll);
router.get('/:id', dictCityController.getOne);
router.delete('/:id', dictCityController.delete);
router.put('/', dictCityController.update);

module.exports = router; // экспорт роутера, используется в файле index