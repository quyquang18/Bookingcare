import axios from 'axios';
// import _ from 'lodash';
// import config from './config';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicXV5cXVhbmcwOSIsImlhdCI6MTUxNjIzOTAyMn0.8EjR1Ajr_deSHqd7LZr0BxiSZIZoejfPiIGHueUdS-I';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
});

// const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
//     const error = new Error();
//     error.httpStatusCode = httpStatusCode;
//     error.statusCode = statusCode;
//     error.errorMessage = errorMessage;
//     error.problems = problems;
//     error.errorCode = errorCode + "";
//     return error;
// };

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code
    const { data } = response;

    return response.data;
});
// instance
//     .get('/your-endpoint')
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
export default instance;
