import axios from '../axios';

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};
const getAllClinic = (mode) => {
    return axios.get(`/api/get-all-clinic?mode=${mode}`);
};
const getDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};
const editInforClinic = (data) => {
    return axios.post(`/api/edit-infor-clinic`, data);
};

export { createNewClinic, getAllClinic, getDetailClinicById, editInforClinic };
