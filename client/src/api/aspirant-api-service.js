import * as axios from "axios";
import jwtDecode from "jwt-decode";

const _instance = axios.create({
    //withCredentials: true,
    baseURL: '/api/'
    //baseURL: 'http://aspirant.ddns.net:3000/api/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

_instance.interceptors.request.use(authInterceptor);

const _pathDictDocAPI = 'dict-doc';
const _pathDictCountryAPI = 'dict-country';
const _pathDictEducationLevelAPI = 'dict-education-level';
const _pathDictCityAPI = 'dict-city';
const _pathDictStreetAPI = 'dict-street';
const _pathDictContactTypeAPI = 'dict-contact-type';
const _pathDictSubjectAPI = 'dict-subject';
const _pathDictEducationFormAPI = 'dict-education-form';
const _pathDictCertificationResultAPI = 'dict-certification-result';
const _pathDictEnterpriseAPI = 'dict-enterprise';
const _pathDictEnterpriseAsTreeAPI = 'dict-enterprise-as-tree';
const _pathDictDirectionAPI = 'dict-direction';
const _pathDictDirectionalityAndSpecialtyAPI = 'dict-directionality-and-specialty';

const _pathFaceAPI = 'face';
const _pathFaceNameAPI = 'face-name';
const _pathFaceDocumentAPI = 'face-document';
const _pathFaceCitizenshipAPI = 'face-citizenship';
const _pathFaceEducationAPI = 'face-education';
const _pathFaceWorkAPI = 'face-work';
const _pathFaceResidenceAPI = 'face-residence';
const _pathFaceContactAPI = 'face-contact';
const _pathFaceOrderAPI = 'face-order';
const _pathFaceEntranceExaminAPI = 'face-entrance-examin';
const _pathFaceAspirantAPI = 'face-aspirant';
const _pathFaceAspirantAcademAPI = 'face-aspirant-academ';
const _pathFaceScientificPublAPI = 'face-scientific-publ';
const _pathFaceCertificationResultAPI = 'face-certification-result';
const _pathFaceBusinessTripAPI = 'face-business-trip';
const _pathFaceExaminationsTripAPI = 'face-examinations';
const _pathFacePhotoAPI = 'face-photo';

const _pathOrdersAPI = 'order';

const _pathFaceAcademicAdvisorAPI = 'face-academic-advisor';

const _userAPI = 'user';

export default class AspirantApiService {
    userApi = {
        async auth() {
            const {data: {token}} = await _instance.post(`${_userAPI}/auth`);
            localStorage.setItem('token', token);
            return jwtDecode(token)
        },
        async login(data) {
            const {data: {token}} = await _instance.post(`${_userAPI}/login`, data);
            localStorage.setItem('token', token);
            return jwtDecode(token);
        },

        async getAll() {
            return _instance.get(_userAPI)
        },
        async getOne(id) {
            return _instance.get(`${_userAPI}/${id}`)
        },
        async delete(id) {
            return _instance.delete(`${_userAPI}/${id}`)
        },
        async post(data) {
            return _instance.post(`${_userAPI}/registration`, data);
        },
        async put(data) {
            return _instance.put(_userAPI, data)
        }
    }

    dictDocAPI = {
        async post(data) {
            return _instance.post(_pathDictDocAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictDocAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictDocAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictDocAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictDocAPI, data)
        }

    }

    dictCountryAPI = {
        async post(data) {
            return _instance.post(_pathDictCountryAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictCountryAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictCountryAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictCountryAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictCountryAPI, data)
        }
    }

    dictEducationLevelAPI = {
        async post(data) {
            return _instance.post(_pathDictEducationLevelAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictEducationLevelAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictEducationLevelAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictEducationLevelAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictEducationLevelAPI, data)
        }
    }

    dictCityAPI = {
        async post(data) {
            return _instance.post(_pathDictCityAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictCityAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictCityAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictCityAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictCityAPI, data)
        }
    }

    dictStreetAPI = {
        async post(data) {
            return _instance.post(_pathDictStreetAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictStreetAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictStreetAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictStreetAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictStreetAPI, data)
        }
    }

    dictContactTypeAPI = {
        async post(data) {
            return _instance.post(_pathDictContactTypeAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictContactTypeAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictContactTypeAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictContactTypeAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictContactTypeAPI, data)
        }
    }

    dictSubjectAPI = {
        async post(data) {
            return _instance.post(_pathDictSubjectAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictSubjectAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictSubjectAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictSubjectAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictSubjectAPI, data)
        }
    }

    dictEducationFormAPI = {
        async post(data) {
            return _instance.post(_pathDictEducationFormAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictEducationFormAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictEducationFormAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictEducationFormAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictEducationFormAPI, data)
        }
    }

    dictCertificationResultAPI = {
        async post(data) {
            return _instance.post(_pathDictCertificationResultAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictCertificationResultAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictCertificationResultAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictCertificationResultAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictCertificationResultAPI, data)
        }
    }

    dictEnterpriseAPI = {
        async post(data) {
            return _instance.post(_pathDictEnterpriseAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictEnterpriseAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictEnterpriseAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictEnterpriseAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictEnterpriseAPI, data)
        }
    }

    dictDirectionAPI = {
        async post(data) {
            return _instance.post(_pathDictDirectionAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictDirectionAPI)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictDirectionAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictDirectionAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictDirectionAPI, data)
        }
    }

    dictDirectionalityAndSpecialtyAPI = {
        async post(data) {
            return _instance.post(_pathDictDirectionalityAndSpecialtyAPI, data)
            //.then(response => response.data)
        },
        async getAll() {
            return _instance.get(_pathDictDirectionalityAndSpecialtyAPI)
            //.then(response => response.data)
        },
        async getAllDirectionality() {
            return _instance.get(`${_pathDictDirectionalityAndSpecialtyAPI}/directionality`)
            //.then(response => response.data)
        },
        async getAllSpecialty() {
            return _instance.get(`${_pathDictDirectionalityAndSpecialtyAPI}/specialty`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathDictDirectionalityAndSpecialtyAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathDictDirectionalityAndSpecialtyAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathDictDirectionalityAndSpecialtyAPI, data)
        }
    }

    dictEnterpriseAsTreeAPI = {
        async getTreeAll() {
            return _instance.get(_pathDictEnterpriseAsTreeAPI)
            //.then(response => response.data)
        },
        async getTreeBranch(id) {
            return _instance.get(`${_pathDictEnterpriseAsTreeAPI}/${id}`)
            //.then(response => response.data)
        },
    }

    facesAPI = {
        async post(data) {
            return _instance.post(_pathFaceAPI, data)
            //.then(response => response.data)
        },
        async getAll(params = null) {
            return _instance.get(`${_pathFaceAPI}`, {
                params: params
            })
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceAPI, data)
        }
    }

    faceNamesAPI = {
        async post(data) {
            return _instance.post(_pathFaceNameAPI, data)
            //.then(response => response.data)
        },
        async getAllNamesOneFace(faceId) {
            return _instance.get(`${_pathFaceNameAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceNameAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceNameAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceNameAPI, data)
        }
    }

    faceDocumentsAPI = {
        async post(data) {
            return _instance.post(_pathFaceDocumentAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceDocumentAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceDocumentAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceDocumentAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceDocumentAPI, data)
        }
    }

    faceCitizenshipsAPI = {
        async post(data) {
            return _instance.post(_pathFaceCitizenshipAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceCitizenshipAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceCitizenshipAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceCitizenshipAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceCitizenshipAPI, data)
        }
    }

    faceEducationsAPI = {
        async post(data) {
            return _instance.post(_pathFaceEducationAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceEducationAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceEducationAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceEducationAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceEducationAPI, data)
        }
    }

    faceWorksAPI = {
        async post(data) {
            return _instance.post(_pathFaceWorkAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceWorkAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceWorkAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceWorkAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceWorkAPI, data)
        }
    }

    faceResidencesAPI = {
        async post(data) {
            return _instance.post(_pathFaceResidenceAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceResidenceAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceResidenceAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceResidenceAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceResidenceAPI, data)
        }
    }

    faceContactsAPI = {
        async post(data) {
            return _instance.post(_pathFaceContactAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceContactAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceContactAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceContactAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceContactAPI, data)
        }
    }

    faceOrdersAPI = {
        async post(data) {
            return _instance.post(_pathFaceOrderAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceOrderAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getAllOneOrder(orderId) {
            return _instance.get(`${_pathFaceOrderAPI}/orderId/${orderId}`)
            //.then(response => response.data)
        },
        async getAllOneRecFaceAspirant(faceAspirantId) {
            return _instance.get(`${_pathFaceOrderAPI}/faceAspirantId/${faceAspirantId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceOrderAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceOrderAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceOrderAPI, data)
        }
    }

    faceEntranceExaminAPI = {
        async post(data) {
            return _instance.post(_pathFaceEntranceExaminAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceEntranceExaminAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceEntranceExaminAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceEntranceExaminAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceEntranceExaminAPI, data)
        }
    }

    faceAspirantAPI = {
        async post(data) {
            return _instance.post(_pathFaceAspirantAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceAspirantAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getAllOneAdvisor(advisorId) {
            return _instance.get(`${_pathFaceAspirantAPI}/advisorId/${advisorId}`)
            //.then(response => response.data)
        },
        async getAllAspirants(params) {
            return _instance.get(`${_pathFaceAspirantAPI}`, {
                params: params
            })
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceAspirantAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceAspirantAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceAspirantAPI, data)
        }
    }

    faceAspirantAcademAPI = {
        async post(data) {
            return _instance.post(_pathFaceAspirantAcademAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceAspirantAcademAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceAspirantAcademAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceAspirantAcademAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceAspirantAcademAPI, data)
        }
    }

    faceAcademicAdvisorAPI = {
        async post(data) {
            return _instance.post(_pathFaceAcademicAdvisorAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceAcademicAdvisorAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getAllFace() {
            return _instance.get(`${_pathFaceAcademicAdvisorAPI}/`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceAcademicAdvisorAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceAcademicAdvisorAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceAcademicAdvisorAPI, data)
        }
    }

    faceScientificPublAPI = {
        async post(data) {
            return _instance.post(_pathFaceScientificPublAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceScientificPublAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceScientificPublAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceScientificPublAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceScientificPublAPI, data)
        }
    }

    faceCertificationResultAPI = {
        async post(data) {
            return _instance.post(_pathFaceCertificationResultAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceCertificationResultAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceCertificationResultAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceCertificationResultAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceCertificationResultAPI, data)
        }
    }

    faceBusinessTripAPI = {
        async post(data) {
            return _instance.post(_pathFaceBusinessTripAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceBusinessTripAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceBusinessTripAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceBusinessTripAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceBusinessTripAPI, data)
        }
    }

    faceExaminationsAPI = {
        async post(data) {
            return _instance.post(_pathFaceExaminationsTripAPI, data)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFaceExaminationsTripAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFaceExaminationsTripAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFaceExaminationsTripAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFaceExaminationsTripAPI, data)
        }
    }

    facePhotoAPI = {
        async post(data) {
            const {dateOn, tblFaceId, file} = data;
            // чтобы отправить и файл оформляю в виде formData
            const formData = new FormData();
            formData.append('dateOn', dateOn)
            formData.append('tblFaceId', tblFaceId)
            formData.append('file', file)
            return _instance.post(_pathFacePhotoAPI, formData)
            //.then(response => response.data)
        },
        async getAllOneFace(faceId) {
            return _instance.get(`${_pathFacePhotoAPI}/faceId/${faceId}`)
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathFacePhotoAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathFacePhotoAPI}/${id}`)
        },
        async put(data) {
            return _instance.put(_pathFacePhotoAPI, data)
        }
    }

    ordersAPI = {
        async post(data) {
            const {numOrder, dateOrder, text, file} = data;
            const formData = new FormData();
            formData.append('numOrder', numOrder);
            formData.append('dateOrder', dateOrder);
            formData.append('text', text);
            formData.append('file', file);
            return _instance.post(_pathOrdersAPI, formData);
            //.then(response => response.data)
        },
        async getAll(params = null) {
            return _instance.get(_pathOrdersAPI, {params})
            //.then(response => response.data)
        },
        async getOne(id) {
            return _instance.get(`${_pathOrdersAPI}/${id}`)
            //.then(response => response.data)
        },
        async delete(id) {
            return _instance.delete(`${_pathOrdersAPI}/${id}`)
        },
        async put(data) {
            const {id, numOrder, dateOrder, text, file, isDeleteFile} = data;
            const formData = new FormData();
            formData.append('numOrder', numOrder);
            formData.append('id', id);
            formData.append('dateOrder', dateOrder);
            formData.append('text', text);
            formData.append('file', file);
            formData.append('isDeleteFile', isDeleteFile);
            return _instance.put(_pathOrdersAPI, formData);
        }
    }

}