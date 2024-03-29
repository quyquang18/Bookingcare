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
const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
};
const getProfileDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const getProvinceVN = (depth) => {
    return axios.get(`https://provinces.open-api.vn/api/?depth=${depth}`);
};
const getListPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`);
};
const doctorConfirmSchedule = (data) => {
    return axios.post(`/api/doctor-confirm-schedule`, data);
};
export {
    getTopDoctorHomeService,
    getAllDoctor,
    updateInforDoctor,
    getDetailDoctorById,
    getMarkdownDoctorById,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getProfileDoctorById,
    getProvinceVN,
    getListPatientForDoctor,
    doctorConfirmSchedule,
};
