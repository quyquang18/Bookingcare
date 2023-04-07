import axios from '../axios';

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};
const verifyBookAppointment = (id, token) => {
    return axios.get(`/api/${id}/verify-book-appointment/${token}/`);
};
export { postPatientBookAppointment, verifyBookAppointment };
