import { getLocalStorage } from 'src/utils/sessionStorage';

import apiInstance, { handleRequest } from './axios';

const orderApi = {
  order: (data) => {
    const url = '/shopping/order';
    return handleRequest(
      apiInstance.post(url, data, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('userToken')}`,
        },
      })
    );
  },
  getAllOrder: () => {
    const url = '/shopping/getAllOrders';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  getAllNotify: () => {
    const url = '/shopping/getAllNotify';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  readNotify: (id) => {
    const url = `/shopping/readNotify/${id}`;
    return handleRequest(
      apiInstance.post(url, null, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  getOrderById: (id) => {
    const url = `/shopping/getOrderById/${id}`;
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  updateOrder: (id, status) => {
    const url = `/shopping/order/update-status/${id}`;
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
