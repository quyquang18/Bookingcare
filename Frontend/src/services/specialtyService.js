import axios from '../axios';

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-speciaty`, data);
};
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-speciaty`);
};
const getDetailSpecialtyById = (id) => {
    return axios.get(`/api/get-detail-speciaty-by-id?id=${id}`);
};
const editInforSpecialty = (data) => {
    return axios.post(`/api/edit-infor-specialty`, data);
};
export { createNewSpecialty, getAllSpecialty, getDetailSpecialtyById, editInforSpecialty };
