import Cookies from 'js-cookie';
import { instance } from '../axios-instance';

export const postDiscount = (data) => {
    return instance.post('/promocodes', data, {
        headers: { Authorization: `Bearer ${Cookies.get('jwt')}` }
    })
}