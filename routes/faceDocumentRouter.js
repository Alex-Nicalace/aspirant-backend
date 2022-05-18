const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const faceDocumentController = require('../controllers/faceDocumentController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), faceDocumentController.create);
router.get('/:id', faceDocumentController.getOne);
router.get('/', faceDocumentController.getAll);
router.get('/faceId/:faceId', faceDocumentController.getAllOneFace);
router.delete('/:id', checkRole('canDelete'), faceDocumentController.delete);
router.put('/', checkRole('canUpdate'), faceDocumentController.update);

module.exports = router; // экспорт роутера, используется в файле index