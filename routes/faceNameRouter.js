const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceNameController = require('../controllers/faceNameController');

router.post('/', faceNameController.create);
router.get('/:id', faceNameController.getOne);
router.get('/', faceNameController.getAllNamesOneFace);
router.put('/', faceNameController.update);
router.delete('/:id', faceNameController.delete);

module.exports = router; // экспорт роутера, используется в файле index