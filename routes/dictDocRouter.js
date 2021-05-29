const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const dictDocController = require('../controllers/dictDocController');

router.post('/',dictDocController.create);
router.get('/', dictDocController.getAll);
router.get('/:id', dictDocController.getOne);
router.delete('/:id', dictDocController.delete);
router.put('/', dictDocController.update);

module.exports = router; // экспорт роутера, используется в файле index