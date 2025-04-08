import { axiosInstance } from '../helper/axios-config';


const getMedias = () => {
  return axiosInstance.get('/media', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const createMedia = (data) => {
  return axiosInstance.post('/media', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const updateMedia = (mediaId, data) => {
  return axiosInstance.put(`/media/${mediaId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const getMediaForId = (mediaId) => {
  return axiosInstance.get(`/media/${mediaId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export {
 
  getMedias, createMedia, updateMedia, getMediaForId,
  
}
