import {
    ACADEMIC_ADVISOR_CARD_ROUTE,
    ACADEMIC_ADVISOR_LIST_ROUTE,
    ACADEMIC_ADVISOR_ROUTE, ASPIRANT_CARD_ROUTE,
    ASPIRANTS_LIST_ROUTE, ASPIRANTS_ROUTE, DICTIONARIES_ADDRESS,
    DICTIONARIES_CERTIFICATION_RESULT_ROUTE,
    DICTIONARIES_DIRECTION_ROUTE,
    DICTIONARIES_EDUCATION_FORM_ROUTE,
    DICTIONARIES_EDUCATION_LEVEL_ROUTE,
    DICTIONARIES_ENTERPRISE_AS_TREE_ROUTE,
    DICTIONARIES_ROUTE,
    DICTIONARIES_SUBJECT_ROUTE,
    DICTIONARIES_TYPE_CONTACT_ROUTE,
    DICTIONARIES_TYPE_DOCUMENT_ROUTE,
    FACE_CARD_ROUTE,
    FACES_LIST_ROUTE,
    FACES_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE, USERS_LIST_ROUTE,
} from "./utils/consts";
import Auth from "./page/auth";
import Dictionaries from "./components/dictionaries";
import React from "react";
import DictionaryIcon from '@material-ui/icons/FontDownload';
import FaceIcon from "@material-ui/icons/Face";
import OrderIcon from "@material-ui/icons/Description";
import AcademicAdvisorIcon from "@material-ui/icons/SupervisorAccount";
import AspirantIcon from "@material-ui/icons/School";
import UserIcon from "@material-ui/icons/AccountCircle";
import DictDoc from "./components/dict-doc";
import DictEducationLevel from "./components/dict-education-level";
import DictContactType from "./components/dict-contact-type/dict-contact-type";
import DictSubject from "./components/dict-subject";
import DictEducationForm from "./components/dict-education-form";
import DictCertificationResult from "./components/dict-certification-result";
import DictEnterpriseAsTree from "./components/dict-enterprise-as-tree";
import FacesRoutes from "./components/faces-routes";
import FacesList from "./components/faces-list";
import FaceAllDataChoiseView from "./components/face-all-data-choise-view";
import OrdersListFaces from "./components/orders-list-faces";
import DictDirectionalityAndSpecialty from "./components/dict-directionality-and-specialty";
import FacesAspirants from "./components/faces-aspirants";
import AspirantRoutes from "./components/aspirant-routes";
import AcademicAdvisorRoutes from "./components/academic-advisor-routes";
import AcademicAdvisorAndAspirants from "./components/academic-advisor-and-aspirants";
import DictAddress from "./components/dict-address";
import UsersList from "./components/users-list";

// список маршрутов для авторизированных пользователей
export const authRoutes = [
    // {
    //     path: ASPIRANT_ROUTE,
    //     render: () => <Aspirant/>,
    //     exact: true,
    //     label: 'главная',
    //     icon: <Home />
    // },
    {
        path: FACES_ROUTE,
        render: () => <FacesRoutes />,
        label: 'лица',
        icon: <FaceIcon />,
        //exact: true
    },
    {
        path: ASPIRANTS_ROUTE ,
        render: () => <AspirantRoutes />,
        label: 'аспиранты',
        icon: <AspirantIcon />,
        //exact: true
    },
    {
        path: ACADEMIC_ADVISOR_ROUTE,
        render: () => <AcademicAdvisorRoutes />,
        label: 'научные руковод.',
        icon: <AcademicAdvisorIcon />,
        //exact: true
    },
    {
        path: ORDERS_ROUTE,
        // render: () => <OrdersList />,
        render: () => <OrdersListFaces />,
        label: 'приказы',
        icon: <OrderIcon />,
        //exact: true
    },
    {
        path: DICTIONARIES_ROUTE,
        render: () => <Dictionaries />,
        exact: false,
        label: 'справочники',
        icon: <DictionaryIcon />
    },
    {
        path: USERS_LIST_ROUTE,
        render: () => <UsersList />,
        exact: false,
        label: 'пользователи',
        icon: <UserIcon />,
        isAdmin: true,
    },
];

export const facesSubRoutes = [
    {
        path: FACES_LIST_ROUTE,
        label: 'список лиц',
        exact: true,
        render: () => <FacesList viewCardMode='link' />
    },
    {
        path: FACE_CARD_ROUTE,
        label: 'данные о лице',
        exact: false,
        render: ({match}) => {
            const {id} = match.params;
            // return <FaceAllData faceId={id}/>
            return <FaceAllDataChoiseView faceId={id}/>
        }
    }
]

export const aspirantsSubRoutes = [
    {
        path: ASPIRANTS_LIST_ROUTE,
        label: 'список аспирантов',
        exact: true,
        render: () => <FacesAspirants />
    },
    {
        path: ASPIRANT_CARD_ROUTE ,
        label: 'данные об аспиранте',
        exact: false,
        render: ({match}) => {
            const {id} = match.params;
            // return <FaceAllData faceId={id}/>
            return <FaceAllDataChoiseView faceId={id}/>
        }
    }
]

export const academicAdvisorSubRoutes = [
    {
        path: ACADEMIC_ADVISOR_LIST_ROUTE,
        label: 'список научн. руковод.',
        exact: true,
        render: () => <AcademicAdvisorAndAspirants />
        // render: () => <FacesAcademicAdvisor viewCardMode='link' />
    },
    {
        path: ACADEMIC_ADVISOR_CARD_ROUTE ,
        label: 'данные об научн. руковод.',
        exact: false,
        render: ({match}) => {
            const {id} = match.params;
            // return <FaceAllData faceId={id}/>
            return <FaceAllDataChoiseView faceId={id}/>
        }
    }
]

export const dictionariesSubRoutes = [
    {path: DICTIONARIES_TYPE_DOCUMENT_ROUTE, label: 'документы', component: <DictDoc/>},
    {path: DICTIONARIES_EDUCATION_LEVEL_ROUTE, label: 'уровни образования', component: <DictEducationLevel/>},
    // {path: DICTIONARIES_COUNTRY_ROUTE, label: 'страны', component: <DictCountry/>},
    // {path: DICTIONARIES_CITY_ROUTE, label: 'города', component: <DictCity/>},
    // {path: DICTIONARIES_STREET_ROUTE, label: 'улицы', component: <DictStreet/>},
    {path: DICTIONARIES_ADDRESS, label: 'адрес', component: <DictAddress />},
    {path: DICTIONARIES_TYPE_CONTACT_ROUTE, label: 'типы контактов', component: <DictContactType/>},
    {path: DICTIONARIES_SUBJECT_ROUTE, label: 'предметы', component: <DictSubject/>},
    {path: DICTIONARIES_EDUCATION_FORM_ROUTE, label: 'форма обучения', component: <DictEducationForm/>},
    {
        path: DICTIONARIES_CERTIFICATION_RESULT_ROUTE,
        label: 'результат аттестации',
        component: <DictCertificationResult/>
    },
    {path: DICTIONARIES_ENTERPRISE_AS_TREE_ROUTE, label: 'структура', component: <DictEnterpriseAsTree />},
    {path: DICTIONARIES_DIRECTION_ROUTE, label: 'направленность/спец.', component: <DictDirectionalityAndSpecialty />},
    // {path: DICTIONARIES_DIRECTIONALITY_ROUTE, label: 'направленность', component: <DictDirectionality />},
]

// список маршрутов для НЕавторизированных пользователей
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        render: () => <Auth/>,
        exact: true
    }
]