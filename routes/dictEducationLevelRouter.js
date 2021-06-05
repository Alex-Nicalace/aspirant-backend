const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictEducationLevelController = require('../controllers/dictEducationLevelController'); //импорт логики роутера (хранится в контроллерах)

router.post('/', dictEducationLevelController.create);
router.get('/', dictEducationLevelController.getAll);
router.get('/:id', dictEducationLevelController.getOne);
router.delete('/:id', dictEducationLevelController.delete);
router.put('/', dictEducationLevelController.update);

module.exports = router; // экспорт роутера, используется в файле index