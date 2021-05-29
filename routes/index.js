// здесь основной ройтер приложения
const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать

const dictCountryRouter = require('./dictCountryRouter');
const dictDocRouter = require('./dictDocRouter');
const faceCitizenshipRouter = require('./faceCitizenshipRouter');
const faceDocumentRouter = require('./faceDocumentRouter');
const faceNameRouter = require('./faceNameRouter');
const faceRouter = require('./faceRouter');
const userRouter = require('./userRouter');

// в основном роутере необходимо указать подроутеры
// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер
router.use('/face', faceRouter);
router.use('/face-name', faceNameRouter);
router.use('/face-document', faceDocumentRouter);
router.use('/face-citizenship', faceCitizenshipRouter);
router.use('/dict-doc', dictDocRouter);
router.use('/dict-country', dictCountryRouter);
router.use('/user', userRouter);

module.exports = router;