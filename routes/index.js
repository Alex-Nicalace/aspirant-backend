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
const facePhotoRouter = require('./facePhotoRouter');
const dictEducationLevelRouter = require('./dictEducationLevelRouter');
const faceEducationRouter = require('./faceEducationRouter');
const faceWorkRouter = require('./faceWorkRouter');
const dictCityRouter = require('./dictCityRouter');
const dictStreetRouter = require('./dictStreetRouter');
const dictContactTypeRouter = require('./dictContactTypeRouter');
const faceResidenceRouter = require('./faceResidenceRouter');
const faceContactsRouter = require('./faceContactsRouter');
const dictEnterpriseRouter = require('./dictEnterpriseRouter');
const dictEnterpriseAsTreeRouter = require('./dictEnterpriseAsTreeRouter');
const orderRouter = require('./orderRouter');
const faceOrderRouter = require('./faceOrderRouter');

// в основном роутере необходимо указать подроутеры
// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер
router.use('/user', userRouter);

router.use('/face', faceRouter);
router.use('/face-name', faceNameRouter);
router.use('/face-document', faceDocumentRouter);
router.use('/face-citizenship', faceCitizenshipRouter);
router.use('/face-photo', facePhotoRouter);
router.use('/face-education', faceEducationRouter);
router.use('/face-work', faceWorkRouter);
router.use('/face-residence', faceResidenceRouter);
router.use('/face-contact', faceContactsRouter);
router.use('/face-order', faceOrderRouter);

router.use('/order', orderRouter);

router.use('/dict-doc', dictDocRouter);
router.use('/dict-country', dictCountryRouter);
router.use('/dict-education-level', dictEducationLevelRouter);
router.use('/dict-city', dictCityRouter );
router.use('/dict-street', dictStreetRouter );
router.use('/dict-contact-type', dictContactTypeRouter );
router.use('/dict-enterprise', dictEnterpriseRouter );
router.use('/dict-enterprise-as-tree', dictEnterpriseAsTreeRouter );


module.exports = router;