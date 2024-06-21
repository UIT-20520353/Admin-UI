import { getLocalStorage } from 'src/utils/sessionStorage';

import apiInstance, { handleRequest } from './axios';

const categoryApi = {
  getAllCategories: () => {
    const url = '/api/admin/category';
    return handleRequest(
      apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
        },
      })
    );
  },
  createCategory: (name) => {
    const url = '/api/admin/category/add';
    return handleRequest(
      apiInstance.post(
        url,
        { name },
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
          },
        }
      )
    );
  },
  updateCategory: (category) => {
    const url = `/api/admin/category/update/${category.id}`;
    return handleRequest(
      apiInstance.post(
        url,
        { name: category.name },
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage('capstone_admin_1')}`,
          },
        }
      )
    );
  },
};

export default categoryApi;
