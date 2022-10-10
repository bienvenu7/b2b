import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import { setErrors } from '../../../redux/reducers/app-reducer';
import { getPostErrors } from '../../../redux/selectors/app-selectors';
import { loginThunk } from '../../../redux/thunks/auth-thunk';
import { AuthLayout } from '../AuthLayout';
import mobileLogo from '../../../common/images/logo-for-mobile.png';
import '../Auth.scss';
import { Loader } from '../../Loader/Loader';

export const SignIn = () => {
  const dispatch = useDispatch();

  const postErrors = useSelector(getPostErrors);

  const [switchBtn, setState] = useState('switch-btn');
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    position: 'bottom-right',
  };
  const [openSnackbar] = useSnackbar(options);
  const [first, setFitst] = useState(false);

  useEffect(() => {
    if (first && postErrors.signin) openSnackbar(postErrors.signin, [5000]);
    setFitst(true);
  }, [postErrors.signin]);

  const setSwitchState = (switchState) => {
    !switchState ? setState('switch-btn switch-on') : setState('switch-btn');
  };

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = 'Please fill in your password';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    if (!values.email || values.email === 'Email') {
      errors.email = 'Please fill in your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await dispatch(loginThunk(values));
      response === 'access' && navigate('/dashboard');
      setIsLoading(false);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthLayout>
      <div className="auth__content-promo" />
      <div className="auth__content-form">
        <div className="auth__content-form-headers">
          <img className="mobileLogo" src={mobileLogo} alt="" />
          <div className="message-h1">Welcome back to the LegitGrails Business Platform!</div>
          <div className="message-h2">Enter your email and password to continue.</div>
        </div>
        <div className="auth__form">
          <form className="auth__form__signin" onSubmit={formik.handleSubmit}>
            <input
              className={formik.touched.email && formik.errors.email ? 'auth__form-elem invalid' : 'auth__form-elem'}
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onClick={() => {
                postErrors && dispatch(setErrors(null));
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="auth__form-errorMessage">{formik.errors.email}</div>
            ) : null}
            {postErrors ? (
              <div className="auth__form-errorMessage">{postErrors === 'emailNotExists' && 'Email not exists'}</div>
            ) : null}
            <input
              className={
                formik.touched.password && formik.errors.password ? 'auth__form-elem invalid' : 'auth__form-elem'
              }
              id="password"
              name="password"
              type="password"
              placeholder="Current password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="off"
              onClick={() => {
                postErrors && dispatch(setErrors(null));
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="auth__form-errorMessage">{formik.errors.password}</div>
            ) : null}
            {postErrors ? (
              <div className="auth__form-errorMessage">
                {postErrors === 'incorrectPassword' && 'Incorrect password'}
              </div>
            ) : null}
            <div className="auth__form-elem-rememberMe">
              <input
                id="rememberMe"
                type="checkbox"
                onChange={formik.handleChange}
                value={formik.values.rememberMe}
                onClick={() => {
                  setSwitchState(formik.values.rememberMe);
                }}
              />
              <label htmlFor="rememberMe" className={switchBtn} />
              <div className="switch-btn-label">Remember Me</div>
            </div>

            <button className="auth__form-submit" type="submit" disabled={isLoading}>
              Sign In
            </button>
          </form>
          <div className="auth__form__bottom-signin">
            <div className="wrapper">
              <div className="auth__form__bottom-message">Dont&apos;t have an account?&nbsp;</div>
              {/* TODO переделать на кнопку */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
              jsx-a11y/no-static-element-interactions */}
              <div
                className="auth__form__bottom-button"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                Sign up
              </div>
            </div>
            {/* TODO переделать на кнопку */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div
              className="auth__form__bottom-button"
              id="1"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot password?
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
