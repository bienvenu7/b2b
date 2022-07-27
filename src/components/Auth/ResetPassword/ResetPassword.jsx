import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SvgSelector from '../../../common/icons/SvgSelector';
import { getStatusCode } from '../../../redux/selectors/app-selectors';
import { forgotPasswordThunk } from '../../../redux/thunks/auth-thunk';
import AuthLayout from '../AuthLayout';
import mobileLogo from '../../../common/images/logo-for-mobile.png'

const ResetPassword = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const statusCode = useSelector(getStatusCode)

    const validate = values => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Please fill in your password';
        } else if (values.password.length < 8) {
            errors.password = 'Must be 8 characters or more';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm: ''
        },
        validate,
        onSubmit: values => {
            const data = {
                password: values.password,
                hash: params.hash
            }
            dispatch(forgotPasswordThunk(data))
        }
    });

    return (
        <AuthLayout>
            <div className='auth__content-promo'></div>
            
            <div className='auth__content-form'>
            <div className='auth__content-form-headers'>
                <img className='mobileLogo' src={mobileLogo} />
                <div className='message-h1'>Set new password!</div>
                <div className='message-h2'>Your password must be different to the previous one.</div>
            </div>
        <div className='auth__form'>
            <form className="auth__form__reset" onSubmit={formik.handleSubmit}>
                <input
                    className='auth__form-elem'
                    id="password"
                    name="password"
                    type='password'
                    onChange={formik.handleChange}
                    placeholder='New password'
                    value={formik.values.password}
                    />
                {formik.touched.password && formik.errors.password ? <div className='auth__form-errorMessage'>{formik.errors.password}</div> : null}
                <input
                    className='auth__form-elem'
                    id="confirm"
                    name="confirm"
                    placeholder='Confirm password'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.confirm}
                    />
                {formik.touched.password && formik.touched.confirm && formik.values.password != formik.values.confirm ? <div className='auth__form-errorMessage'>The passwords do not match!</div> : null}

                <button className='auth__form-submit' type="submit">Reset</button>
            </form>
            <div className='auth__form__bottom-signin'>
                <div className='wrapper'>{statusCode == 200 ? <div className='auth__form__bottom-message'>Your password has successfully been reset!</div> : null}
                <div className='auth__form__bottom-button' onClick={()=>{navigate('../auth/signin')}}><SvgSelector id='backIcon'/>&nbsp;Back to login</div></div>
            </div>
        </div>
        </div>
        </AuthLayout>
    )
}

export default ResetPassword