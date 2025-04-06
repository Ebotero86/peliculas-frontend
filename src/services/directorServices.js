import { axiosInstance } from '../helper/axios-config';

const getDirectores = () => {
    return axiosInstance.get('director', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createDirector = (data) => {
    return axiosInstance.post('director', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateDirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getDirectores, createDirector, updateDirector
}
