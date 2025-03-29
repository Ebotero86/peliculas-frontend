import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('productora', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createproductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateproductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProductoras, createproductora, updateproductora
}
