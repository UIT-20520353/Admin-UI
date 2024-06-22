import { getLocalStorage } from 'src/utils/sessionStorage';

import apiInstance, { handleRequest } from './axios';

const userApi = {
  getAll: () => {
    const url = '/api/admin/user';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  getOrder: (orderId) => {
    const url = `/api/admin/user/${orderId}`;
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
};

export default userApi;
