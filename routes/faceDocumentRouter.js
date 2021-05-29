const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceDocumentController = require('../controllers/faceDocumentController');

router.post('/', faceDocumentController.create);
router.get('/:id', faceDocumentController.getOne);
router.delete('/:id', faceDocumentController.delete);
router.put('/', faceDocumentController.update);

module.exports = router; // экспорт роутера, используется в файле index