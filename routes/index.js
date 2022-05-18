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
const faceAspirantAcademRouter = require('./faceAspirantAcademRouter');
const authMiddleware = require('../middleware/authMiddleware');

// в основном роутере необходимо указать подроутеры
// первый параметр URL по которому роутер будет отрабатывать
// 2 параметр сам роутер
router.use('/user', userRouter);

router.use('/face', authMiddleware, faceRouter);
router.use('/face-name', authMiddleware, faceNameRouter);
router.use('/face-document', authMiddleware, faceDocumentRouter);
router.use('/face-citizenship', authMiddleware, faceCitizenshipRouter);
router.use('/face-photo', authMiddleware, facePhotoRouter);
router.use('/face-education', authMiddleware, faceEducationRouter);
router.use('/face-work', authMiddleware, faceWorkRouter);
router.use('/face-residence', authMiddleware, faceResidenceRouter);
router.use('/face-contact', authMiddleware, faceContactsRouter);
router.use('/face-order', authMiddleware, faceOrderRouter);
router.use('/face-entrance-examin', authMiddleware, faceEntranceExaminRouter);
router.use('/face-aspirant', authMiddleware, faceAspirantRouter);
router.use('/face-aspirant-academ', authMiddleware, faceAspirantAcademRouter);
router.use('/face-academic-advisor', authMiddleware, academicAdvisorRouter);
router.use('/face-scientific-publ', authMiddleware, faceScientificPublicationsRouter);
router.use('/face-certification-result', authMiddleware, faceCertificationResultRouter);
router.use('/face-business-trip', authMiddleware, faceBusinessTripRouter);
router.use('/face-examinations', authMiddleware, faceExaminationsRouter);

router.use('/order', authMiddleware, orderRouter);

router.use('/dict-doc', authMiddleware, dictDocRouter);
router.use('/dict-country', authMiddleware, dictCountryRouter);
router.use('/dict-education-level', authMiddleware, dictEducationLevelRouter);
router.use('/dict-city', authMiddleware,  dictCityRouter );
router.use('/dict-street', authMiddleware, dictStreetRouter );
router.use('/dict-contact-type', authMiddleware, dictContactTypeRouter );
router.use('/dict-enterprise', authMiddleware, dictEnterpriseRouter );
router.use('/dict-enterprise-as-tree', authMiddleware, dictEnterpriseAsTreeRouter );
router.use('/dict-subject', authMiddleware, dictSubjectRouter);
router.use('/dict-education-form', authMiddleware, dictEducationFormRouter);
router.use('/dict-certification-result', authMiddleware, dictCertificationResultRouter);
router.use('/dict-direction', authMiddleware, dictDirectionRouter);
router.use('/dict-directionality-and-specialty', authMiddleware, dictDirectionalityAndSpecialtyRouter);


module.exports = router;