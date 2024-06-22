import apiInstance, { handleRequest } from './axios';

const customerApi = {
  login: (formData) => {
    const url = '/api/login';
    return handleRequest(apiInstance.post(url, formData));
  },
};

export default customerApi;
