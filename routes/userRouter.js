const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const userController = require('../controllers/userController'); //импорт логики роутера (хранится в контроллерах)
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require("../middleware/checkRoleMiddleware");

router.get('/', authMiddleware, checkRole('isAdmin'),  userController.getAll);
router.get('/:id', authMiddleware, checkRole('isAdmin'), userController.getOne);
router.delete('/:id', authMiddleware, checkRole('isAdmin'), userController.delete);
router.put('/', authMiddleware, checkRole('isAdmin'), userController.update);

router.post('/registration',  authMiddleware, checkRole('isAdmin'), userController.registration);
router.post('/login', userController.login);
router.post('/auth', authMiddleware, userController.check); //проверка авторизован ли пользователь с помощью токена

module.exports = router; // экспорт роутера, используется в файле index