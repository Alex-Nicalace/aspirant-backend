import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import dictDocReducer from "./reducers/dict-doc-reducer";
import userReducer from "./reducers/user-reducer";
import messagesReducer from "./reducers/messages-reducer";
import dictCountryReducer from "./reducers/dict-country-reducers";
import dictEducationLevelsReducer from "./reducers/dict-education-level-reducers";
import dictCityReducer from "./reducers/dict-city-reducers";
import dictStreetReducer from "./reducers/dict-street-reducers";
import dictContactTypeReducer from "./reducers/contact-type-reducers";
import dictSubjectReducer from "./reducers/dict-subject-reducers";
import dictEducationFormReducer from "./reducers/dict-education-form-reducers";
import dictCertificationResultReducer from "./reducers/dict-certification-result-reducers";
import dictEnterpriseReducer from "./reducers/dict-enterprise-reducers";
import facesReducer from "./reducers/faces-reducers";
import faceNamesReducer from "./reducers/face-names-reducers";
import faceDocumentsReducer from "./reducers/face-documents-reducers";
import faceCitizenshipsReducer from "./reducers/face-citizenships-reducers";
import faceEducationsReducer from "./reducers/face-educations-reducers";
import faceWorksReducer from "./reducers/face-works-reducers";
import faceResidencesReducer from "./reducers/face-residences-reducers";
import faceContactsReducer from "./reducers/face-contacts-reducers";
import faceOrdersReducer from "./reducers/face-orders-reducers";
import faceEntranceExaminReducer from "./reducers/face-entrance-examin-reducers";
import faceAspirantReducer from "./reducers/face-aspirant-reducers";
import faceScientificPublReducer from "./reducers/face-scientific-publ-reducers";
import faceCertificationResultReducer from "./reducers/face-certification-result-reducers";
import faceBusinessTripReducer from "./reducers/face-business-trip-reducers";
import faceExaminationsReducer from "./reducers/face-examinations-reducers";
import ordersReducer from "./reducers/orders-reducers";
import orderFacesReducer from "./reducers/order-faces-reducers";
import facesAcademicAdvisorReducer from "./reducers/faces-academic-advisor-reducers";
import dictDirectionReducer from "./reducers/dict-direction-reducers";
import dictDirectionalityAndSpecialtyReducer from "./reducers/dict-directionality-and-specialty-reducers";
import aspirantOrdersReducer from "./reducers/face-aspirant-orders-reducers";
import facesAspirantsReducer from "./reducers/faces-aspirants-reducers";
import aspirantsByAdvisorReducer from "./reducers/faces-aspirants-by-advisor-reducers";
import facePhotoReducer from "./reducers/face-photo-reducers";
import faceAspirantAcademReducer from "./reducers/face-aspirant-academ-reducers";
import usersListReducer from "./reducers/users-list-reducers";

const reducer = combineReducers({
    user: userReducer,
    usersList: usersListReducer,

    messages: messagesReducer,

    dictDoc: dictDocReducer,
    dictCountry: dictCountryReducer,
    dictEducationLevels: dictEducationLevelsReducer,
    dictCity: dictCityReducer,
    dictStreet: dictStreetReducer,
    dictContactType: dictContactTypeReducer,
    dictSubject: dictSubjectReducer,
    dictEducationForm: dictEducationFormReducer,
    dictCertificationResult: dictCertificationResultReducer,
    dictEnterprise: dictEnterpriseReducer,
    dictDirection: dictDirectionReducer,
    dictDirectionality: dictDirectionalityAndSpecialtyReducer,

    faces: facesReducer,
    faceNames: faceNamesReducer,
    faceDocuments: faceDocumentsReducer,
    faceCitizenships: faceCitizenshipsReducer,
    faceEducations: faceEducationsReducer,
    faceWorks: faceWorksReducer,
    faceResidences: faceResidencesReducer,
    faceContacts: faceContactsReducer,
    faceOrders: faceOrdersReducer,
    faceEntranceExamin: faceEntranceExaminReducer,
    faceAspirant: faceAspirantReducer,
    faceScientificPubl: faceScientificPublReducer,
    faceCertificationResult: faceCertificationResultReducer,
    faceBusinessTrip: faceBusinessTripReducer,
    faceExaminations: faceExaminationsReducer,
    faceAspirantOrders: aspirantOrdersReducer,
    facePhoto: facePhotoReducer,
    faceAspirantAcadem: faceAspirantAcademReducer,

    orders: ordersReducer,
    orderFaces: orderFacesReducer,

    facesAcademicAdvisor: facesAcademicAdvisorReducer,
    aspirantsByAdvisor: aspirantsByAdvisorReducer,

    facesAspirants: facesAspirantsReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
