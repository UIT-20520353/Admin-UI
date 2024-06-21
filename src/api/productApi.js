import { getLocalStorage } from 'src/utils/sessionStorage';

import apiInstance, { handleRequest } from './axios';

const productApi = {
  getAllProducts: (page) => {
    const url = '/api/admin/product';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
        params: {
          size: 10,
          sort: 'id,asc',
          page,
        },
      })
    );
  },
  createProduct: (product) => {
    const url = '/api/admin/product/add';
    return handleRequest(
      apiInstance.post(url, product, {
        headers: { Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}` },
      })
    );
  },
  updateProduct: (product) => {
    const url = `/api/admin/product/update/${product.id}`;
    return handleRequest(
      apiInstance.post(
        url,
        { ...product, id: null, imgUrl: null },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}` },
        }
      )
    );
  },
};

export default productApi;
