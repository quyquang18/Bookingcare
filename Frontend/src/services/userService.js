import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const handleVerifyEmail = (id, token) => {
    return axios.get(`/api/user/${id}/verify/${token}`);
};
const handleRegisterApi = (data) => {
    return axios.post(`/api/create-new-user`, {
        email: data.email,
        fullname: data.username,
        password: data.password,
        phonenumber: data.phonenumber,
    });
};
const handleGetAllUsers = (id) => {
    return axios.get(`/api/get-all-users?type=${id}`);
};
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
};
const deleteUserService = (idUser) => {
    return axios.delete(`/api/delete-user`, { data: { id: idUser } });
};
const editUserService = (data) => {
    return axios.put(`/api/edit-user`, {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phonenumber: data.phonenumber,
        address: data.address,
        gender: data.gender,
        role: data.role,
        position: data.position,
        avatar: data.avatar,
    });
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode/?type=${inputType}`);
};
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
export {
    handleLoginApi,
    handleVerifyEmail,
    handleRegisterApi,
    handleGetAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    updateInforDoctor,
    getDetailDoctorById,
    getMarkdownDoctorById,
};
