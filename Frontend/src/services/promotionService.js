import axios from '../axios';

const createNewPromotion = (data) => {
    return axios.post(`/api/create-new-promotion`, data);
};
const getAllPromotion = () => {
    return axios.get(`/api/get-all-promotion`);
};

export { createNewPromotion, getAllPromotion };
