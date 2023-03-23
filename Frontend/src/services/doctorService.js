import axios from '../axios';

const getTopDoctorHomeService = (limitInput) => {
    return axios.get(`/api/top-doctor-home/?limit=${limitInput}`);
};
const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctors`);
};
const updateInforDoctor = (data) => {
    return axios.post(`/api/post-infor-doctor`, data);
};
const getDetailDoctorById = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const getMarkdownDoctorById = (inputId) => {
    return axios.get(`/api/get-markdown-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};
export {
    getTopDoctorHomeService,
    getAllDoctor,
    updateInforDoctor,
    getDetailDoctorById,
    getMarkdownDoctorById,
    saveBulkScheduleDoctor,
};
