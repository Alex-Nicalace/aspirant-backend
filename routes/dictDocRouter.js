const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictDocController = require('../controllers/dictDocController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('canInsert'), dictDocController.create);
router.get('/', dictDocController.getAll);
router.get('/:id', dictDocController.getOne);
router.delete('/:id', checkRole('canDelete'), dictDocController.delete);
router.put('/', checkRole('canUpdate'), dictDocController.update);

module.exports = router; // экспорт роутера, используется в файле index