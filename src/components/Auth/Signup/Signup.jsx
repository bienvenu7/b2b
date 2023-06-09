import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import { setErrors } from '../../../redux/reducers/app-reducer';
import { getPostErrors } from '../../../redux/selectors/app-selectors';
import { getIsRegister } from '../../../redux/selectors/auth-selectors';
import { regThunk } from '../../../redux/thunks/auth-thunk';
import { AuthLayout } from '../AuthLayout';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import mobileLogo from '../../../common/images/logo-for-mobile.png';

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postErrors = useSelector(getPostErrors);
  const isRegister = useSelector(getIsRegister);

  const options = {
    position: 'bottom-right',
  };
  const [openSnackbar] = useSnackbar(options);
  const [first, setFitst] = useState(false);

  useEffect(() => {
    if (first && postErrors.signup) openSnackbar(postErrors.signup, [5000]);
    setFitst(true);
  }, [postErrors.signup]);

  const [isLoading, setIsLoading] = useState(false);
  const message = 'We have sent a confirmation email to you! Please check your inbox';

  const validate = (values) => {
    const errors = {};
    if (!values.company || values.company === 'Company Name*') {
      errors.company = 'Please fill in your company';
    }
    if (!values.conditions) {
      console.log('Please accept the user agreement');
      errors.conditions = 'Please accept the user agreement';
    }
    if (!values.password || values.password === 'Password*') {
      errors.password = 'Please fill in your password';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    if (!values.email || values.email === 'Email Address*') {
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
      company: '',
      role: '',
      number: '',
      rememberMe: false,
      conditions: false,
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      if (values.email === 'Email Address*') {
        formik.errors.company = 'Please fill in your company';
      }
      dispatch(regThunk(values));
      resetForm({});

      setIsLoading(false);
    },
  });

  const openInNewTab = (url) => {
    let mainurl = window.location.href.split('/');
    mainurl.pop();
    mainurl = mainurl.join('/');
    window.open(mainurl + url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AuthLayout>
      <div className="auth__content-promo">
        <div className="auth__content-promo-elem">
          <div className="promo-h1">
            <SvgSelector id="check" />
            Best Market Rates
          </div>
          <div className="promo-h2">Access the most advanced authentication expertise at the lowest possible cost.</div>
        </div>
        <div className="auth__content-promo-elem">
          <div className="promo-h1">
            <SvgSelector id="check" />
            Authentication Dashboard
          </div>
          <div className="promo-h2">
            Automated authentication process, live dashboard and customisable reports for your business.
          </div>
        </div>
        <div className="auth__content-promo-elem">
          <div className="promo-h1">
            <SvgSelector id="check" />
            24/7 Customer Support
          </div>
          <div className="promo-h2">Priority support for your team to ensure the smoothest process execution.</div>
        </div>
      </div>
      <div className="auth__content-form">
        <div className="auth__content-form-headers">
          <img className="mobileLogo" src={mobileLogo} alt="" />
          <div className="message-h1">Welcome to the LegitGrails Business Platform!</div>
          <div className="message-h2">Sign up to access all the benefits.</div>
        </div>
        <div className="auth__form">
          <form className="auth__form__signup" onSubmit={formik.handleSubmit}>
            <input
              className={
                formik.touched.company && formik.errors.company ? 'auth__form-elem invalid' : 'auth__form-elem'
              }
              id="company"
              name="company"
              type="text"
              placeholder="Company Name*"
              onChange={formik.handleChange}
              value={formik.values.company}
              onClick={() => {
                formik.values.company === 'Company Name*' && formik.setFieldValue('company', '');
              }}
            />
            {formik.touched.company && formik.errors.company ? (
              <div className="auth__form-errorMessage">{formik.errors.company}</div>
            ) : null}
            <input
              className="auth__form-elem"
              id="role"
              name="role"
              type="text"
              placeholder="Your role at the company"
              onChange={formik.handleChange}
              value={formik.values.role}
            />
            <input
              className="auth__form-elem"
              id="number"
              name="number"
              type="text"
              onChange={formik.handleChange}
              placeholder="Number of expected monthly authentications"
              value={formik.values.number}
            />
            <input
              className={formik.touched.email && formik.errors.email ? 'auth__form-elem invalid' : 'auth__form-elem'}
              id="email"
              name="email"
              type="text"
              placeholder="Email Address*"
              onChange={formik.handleChange}
              value={formik.values.email}
              onClick={() => postErrors && postErrors.signup && dispatch(setErrors(null))}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="auth__form-errorMessage">{formik.errors.email}</div>
            ) : null}
            <input
              className={
                formik.touched.password && formik.errors.password ? 'auth__form-elem invalid' : 'auth__form-elem'
              }
              id="password"
              name="password"
              type="password"
              placeholder="Password*"
              onChange={formik.handleChange}
              autoComplete="off"
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="auth__form-errorMessage">{formik.errors.password}</div>
            ) : null}

            <div className="termscheckbox">
              <input
                type="checkbox"
                className={formik.touched.conditions && formik.errors.conditions ? 'conditionserror' : ''}
                id="conditions"
                onChange={formik.handleChange}
                checked={formik.values.conditions}
              />
              <label htmlFor="conditions">
                I accept{' '}
                <a
                  href="/conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    openInNewTab('/conditions');
                  }}
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {isRegister && <div className="auth__success-text"> {message} </div>}
            {formik.touched.conditions && formik.errors.conditions ? (
              <div className="auth__form-errorMessage">Please confirm the form</div>
            ) : null}
            <button className="auth__form-submit" type="submit" disabled={isLoading}>
              Sign Up
            </button>
          </form>
          <div className="auth__form__bottom">
            <div className="auth__form__bottom-message">Already have an account?&nbsp;</div>
            {/* TODO переделать на кнопку */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div
              className="auth__form__bottom-button"
              onClick={() => {
                navigate('/signin');
              }}
            >
              Sign in
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
