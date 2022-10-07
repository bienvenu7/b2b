import Cookies from 'js-cookie';
import { instance } from '../axios-instance';

export const getAlbum = (id) => {
  return instance.get(`/file/get-photos-by-hash/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  });
};
