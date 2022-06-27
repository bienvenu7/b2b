import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../../redux/selectors/auth-selectors';
import { loginThunk } from '../../../redux/thunks/auth-thunk';

const SignIn = () => {

    const dispatch = useDispatch()

    const isAuth = useSelector(getIsAuth)

    useEffect(()=>{
        isAuth && navigate('../main')
    },[isAuth])

    const [switchBtn, setState] = useState('switch-btn')

    const setSwitchState = (switchState) =>{
        !switchState ? setState('switch-btn switch-on') : setState('switch-btn')
    }

    const [type, setType] = useState('text')

    const navigate = useNavigate()

    const validate = values => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Please fill in your password';
        } else if (values.password.length < 8) {
            errors.password = 'Must be 8 characters or more';
        }

        if (!values.email) {
            errors.email = 'Please fill in your email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: 'Email',
            password: 'Current password',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(loginThunk(values))
        }
    });


    return (
        <div className='auth__form'>
            <form className="auth__form__signin" onSubmit={formik.handleSubmit}>
                <input
                    className='auth__form-elem'
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={() => { formik.values.email == '' && formik.setFieldValue('email', 'Email') }}
                    value={formik.values.email}
                    onClick={() => { formik.values.email == 'Email' && formik.setFieldValue('email', '') }}
                />
                {formik.touched.email && formik.errors.email ? <div className='auth__form-errorMessage'>{formik.errors.email}</div> : null}
                <input
                    className='auth__form-elem'
                    id="password"
                    name="password"
                    type={type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onClick={() => { setType('password'); formik.setFieldValue('password', '') }}
                />
                {formik.touched.password && formik.errors.password ? <div className='auth__form-errorMessage'>{formik.errors.password}</div> : null}
                <div className='auth__form-elem-rememberMe'><input
                    id="rememberMe"
                    type='checkbox'
                    onChange={formik.handleChange}
                    value={formik.values.rememberMe}
                    onClick={() => { setSwitchState(formik.values.rememberMe) }} />
                    <label htmlFor='rememberMe' className={switchBtn} /><div className='switch-btn-label'>Remember Me</div></div>


                <button className='auth__form-submit' type="submit">Sign In</button>
            </form>
            <div className='auth__form__bottom-signin'>
                <div className='wrapper'><div className='auth__form__bottom-message'>Dont't have an account?&nbsp;</div>
                <div className='auth__form__bottom-button' onClick={()=>{navigate('../auth/signup')}}>Sign up</div></div>
                <div className='auth__form__bottom-button' id='1' onClick={()=>{navigate('../auth/forgot')}}>Forgot password?</div>
            </div>
        </div>
    )
}

export default SignIn