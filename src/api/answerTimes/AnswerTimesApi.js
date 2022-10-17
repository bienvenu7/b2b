import Cookies from 'js-cookie';
import { instance } from '../axios-instance';

export const getAnswerTime = () => {
    return instance.get('/answer-time', {
      headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
    });
}