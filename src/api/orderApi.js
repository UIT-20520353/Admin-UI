import { getLocalStorage } from 'src/utils/sessionStorage';

import apiInstance, { handleRequest } from './axios';

const orderApi = {
  getAllOrder: () => {
    const url = '/api/admin/order';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  getOrder: (orderId) => {
    const url = `/api/admin/order/${orderId}`;
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  updateCategory: (orderId, status) => {
    const url = `/api/admin/order/update-status/${orderId}`;
    return handleRequest(
      apiInstance.post(
        url,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
          },
        }
      )
    );
  },
};

export default orderApi;
