const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const userController = require('../controllers/userController'); //импорт логики роутера (хранится в контроллерах)

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.check); //проверка авторизован ли пользователь с помощью токена

module.exports = router; // экспорт роутера, используется в файле index