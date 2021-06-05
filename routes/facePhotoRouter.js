const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const facePhotoController = require('../controllers/facePhotoController');

// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер

router.post('/', facePhotoController.create);
router.get('/', facePhotoController.getAll);
router.get('/:id', facePhotoController.getOne);
router.delete('/:id', facePhotoController.delete);
router.put('/', facePhotoController.update);
//router.get('/names/:id', faceController.getAllNamesOneFace)


module.exports = router; // экспорт роутера, используется в файле index