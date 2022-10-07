import Cookies from 'js-cookie';
import { confirmEmail, forgotEmail, forgotPassword, getAuth, login, register } from '../../api/auth/auth-api';
import { setAuth, setRegister } from '../reducers/auth-reducer';
import { setErrors, setStatusCode } from '../reducers/app-reducer';

export const getAuthThunk = (data) => async (dispatch) => {
  try {
    const token = await Cookies.get('jwt');
    if (token === undefined) {
      const response = await getAuth(data);
      dispatch(setAuth(response.data));
    } else {
      const response = await getAuth(token);
      dispatch(setAuth(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginThunk = (data) => async (dispatch) => {
  try {
    const response = await login(data);
    await Cookies.set('jwt', response.data.token);
    await dispatch(getAuthThunk(response.data.token));
    return 'access';
  } catch (error) {
    const data = {
      page: 'signin',
      error:
        // eslint-disable-next-line no-nested-ternary
        error && error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors && error.response.data.errors.password
          ? error.response.data.errors.password
          : null,
    };
    dispatch(setErrors(data));
  }
};

export const regThunk = (data) => async (dispatch) => {
  try {
    const postData = {
      email: data.email,
      password: data.password,
      firstName: 'testFirst',
      lastName: 'testLast',
      companyName: data.company,
    };
    const response = await register(postData);
    const loginData = {
      email: data.email,
      password: data.password,
    };
    if (response.status === 201) {
      await dispatch(loginThunk(loginData));
      dispatch(setRegister());
      return 'access';
    }
  } catch (error) {
    dispatch(
      setErrors({
        page: 'signup',
        error:
          error && error.response && error.response.data && error.response.data.message
            ? error.response.data.message[0]
            : null,
      }),
    );
  }
};

export const logoutThunk = () => async (dispatch) => {
  await Cookies.remove('jwt');
  dispatch(setAuth(null));
};

export const forgotEmailThunk = (data) => async (dispatch) => {
  try {
    await forgotEmail(data);
    return true;
  } catch (error) {
    const dataResponse = error.response.data;
    const data = {
      page: 'forgot',
      // eslint-disable-next-line no-nested-ternary
      error: dataResponse.message
        ? dataResponse.message
        : error.response && error.response.data && error.response.data.errors && error.response.data.errors.email
        ? error.response.data.errors.email
        : null,
    };
    dispatch(setErrors(data));
    return false;
  }
};

export const forgotPasswordThunk = (data) => async (dispatch) => {
  const response = await forgotPassword(data);
  if (response.status === 200) {
    dispatch(setStatusCode(200));
  }
};

export const confirmEmailThunk = (data) => async (dispatch) => {
  const response = await confirmEmail(data);
  if (response.status === 200) {
    dispatch(setStatusCode(200));
  }
};
