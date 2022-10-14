import Cookies from 'js-cookie';
import { instance } from '../axios-instance';

export const getUserss = (page, limit) => {
  return instance.get(`product-types?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};

export const getProduct = (id) => {
  return instance.get(`products/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};

export const getUsers = (data) => {
  return instance.get(
    '/users',
    { ...data, page: 1, limit: 100 },
    { headers: { Authorization: `Bearer ${Cookies.get('jwt')}` } },
  );
};