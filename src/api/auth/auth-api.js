import Cookies from 'js-cookie';
import { instance } from '../axios-instance';

export const register = (data) => {
  return instance.post('auth/email/register', data);
};

export const login = (data) => {
  return instance.post('auth/email/login', data); 
  // удалить до пуша. Костыль 
  // return instance.post('auth/admin/email/login', data); 
};

export const getAuth = (data) => {
  return instance.get('auth/me', {
    headers: { Authorization: `Bearer ${data}` },
  });
};

export const removeMe = () => {
  return instance.delete('auth/me', {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};

export const forgotEmail = (data) => {
  return instance.post('auth/forgot/password', data, {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};

export const forgotPassword = (data) => {
  return instance.post('auth/reset/password', data, {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};

export const confirmEmail = (data) => {
  return instance.post('auth/email/confirm', data);
};
