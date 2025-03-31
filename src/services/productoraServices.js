import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('productora', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createProductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProductoras, createProductora, updateProductora
}
