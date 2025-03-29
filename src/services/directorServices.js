import { axiosInstance } from '../helper/axios-config';

const getDirectores = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createdirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updatedirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getDirectores, createdirector, updatedirector
}
