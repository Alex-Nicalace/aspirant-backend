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
const dictSubjectRouter = require('./dictSubjectRouter');
const faceEntranceExaminRouter = require('./faceEntranceExaminRouter');
const dictEducationFormRouter = require('./dictEducationFormRouter');
const faceAspirantRouter = require('./faceAspirantRouter');
const academicAdvisorRouter = require('./academicAdvisorRouter');
const faceScientificPublicationsRouter = require('./faceScientificPublicationsRouter');
const dictCertificationResultRouter = require('./dictCertificationResultRouter');
const faceCertificationResultRouter = require('./faceCertificationResultRouter');
const faceBusinessTripRouter = require('./faceBusinessTripRouter');
const faceExaminationsRouter = require('./faceExaminationsRouter');
const dictDirectionRouter = require('./dictDirectionRouter');
const dictDirectionalityAndSpecialtyRouter = require('./dictDirectionalityAndSpecialtyRouter');

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
router.use('/face-entrance-examin', faceEntranceExaminRouter);
router.use('/face-aspirant', faceAspirantRouter);
router.use('/face-academic-advisor', academicAdvisorRouter);
router.use('/face-scientific-publ', faceScientificPublicationsRouter);
router.use('/face-certification-result', faceCertificationResultRouter);
router.use('/face-business-trip', faceBusinessTripRouter);
router.use('/face-examinations', faceExaminationsRouter);

router.use('/order', orderRouter);

router.use('/dict-doc', dictDocRouter);
router.use('/dict-country', dictCountryRouter);
router.use('/dict-education-level', dictEducationLevelRouter);
router.use('/dict-city', dictCityRouter );
router.use('/dict-street', dictStreetRouter );
router.use('/dict-contact-type', dictContactTypeRouter );
router.use('/dict-enterprise', dictEnterpriseRouter );
router.use('/dict-enterprise-as-tree', dictEnterpriseAsTreeRouter );
router.use('/dict-subject', dictSubjectRouter);
router.use('/dict-education-form', dictEducationFormRouter);
router.use('/dict-certification-result', dictCertificationResultRouter);
router.use('/dict-direction', dictDirectionRouter);
router.use('/dict-directionality-and-specialty', dictDirectionalityAndSpecialtyRouter);


module.exports = router;