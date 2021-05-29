const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceController = require('../controllers/faceController');

// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер

router.post('/', faceController.create);
router.get('/', faceController.getAll);
router.get('/:id', faceController.getOne);
router.delete('/:id', faceController.delete);
router.put('/', faceController.update);
//router.get('/names/:id', faceController.getAllNamesOneFace)


module.exports = router; // экспорт роутера, используется в файле index