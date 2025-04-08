import { axiosInstance } from '../helper/axios-config';

const getTipos = () => {
    return axiosInstance.get('/tipo', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createTipo = (data) => {
    return axiosInstance.post('/tipo', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateTipo = (tipoId, data) => {
    return axiosInstance.put(`/tipo/${tipoId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getTipos, createTipo, updateTipo
}
