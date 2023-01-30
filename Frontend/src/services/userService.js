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
export { handleLoginApi, handleVerifyEmail, handleRegisterApi, handleGetAllUsers };
