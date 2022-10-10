import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import { setErrors } from '../../../redux/reducers/app-reducer';
import { getPostErrors } from '../../../redux/selectors/app-selectors';
import { forgotEmailThunk } from '../../../redux/thunks/auth-thunk';
import { AuthLayout } from '../AuthLayout';
import mobileLogo from '../../../common/images/logo-for-mobile.png';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postErrors = useSelector(getPostErrors);

  const [send, setSendState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    position: 'bottom-right',
  };
  const [openSnackbar] = useSnackbar(options);
  const [first, setFitst] = useState(false);

  useEffect(() => {
    if (first && postErrors.forgot) openSnackbar(postErrors.forgot, [5000]);
    setFitst(true);
  }, [postErrors.forgot]);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please fill in your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await dispatch(forgotEmailThunk(values));
      response && setSendState(true);
      setIsLoading(false);
    },
  });

  return (
    <AuthLayout>
      <div className="auth__content-promo" />
      <div className="auth__content-form">
        <div className="auth__content-form-headers">
          <img className="mobileLogo" src={mobileLogo} alt="" />
          <div className="message-h1">Forgot your password?</div>
          <div className="message-h2">No worries, we’ll send you reset instructions.</div>
        </div>
        <div className="auth__form">
          <form className="auth__form__signin" onSubmit={formik.handleSubmit}>
            <input
              className={formik.touched.email && formik.errors.email ? 'auth__form-elem invalid' : 'auth__form-elem'}
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              placeholder="Enter your email"
              value={formik.values.email}
              onClick={() => dispatch(setErrors(null))}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="auth__form-errorMessage">{formik.errors.email}</div>
            ) : null}

            <button className="auth__form-submit" type="submit" disabled={isLoading}>
              Reset password
            </button>
          </form>
          <div className="auth__form__bottom">
            <div className="wrapper">
              {send && <div className="auth__form__bottom-signin-message">We’ve sent you the reset instruction!</div>}
              {/* TODO переделать на кнопку */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
              jsx-a11y/no-static-element-interactions */}
              <div
                className="auth__form__bottom-button"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Back to login
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
