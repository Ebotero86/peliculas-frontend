import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
    return axiosInstance.get('genero', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getGeneros, createGenero, updateGenero
}
