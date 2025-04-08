import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('/productora', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createProductora = (data) => {
    return axiosInstance.post('/productora', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateProductora = (productoraId, data) => {
    return axiosInstance.put(`/productora/${productoraId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProductoras, createProductora, updateProductora
}
