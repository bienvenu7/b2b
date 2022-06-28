import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../../redux/selectors/auth-selectors';
import { getAuthThunk, loginThunk, regThunk } from '../../../redux/thunks/auth-thunk';

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [type, setType] = useState('text')
    const [switchBtn, setState] = useState('switch-btn')

    const setSwitchState = (switchState) =>{
        !switchState ? setState('switch-btn switch-on') : setState('switch-btn')
    }

    const validate = values => {
        const errors = {};
        if (!values.company) {
            errors.company = 'Please fill in your company';
        }

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
            email: 'Email Address*',
            password: 'Password*',
            company: 'Company Name*',
            role: 'Your role at the company',
            number: 'Number of expected monthly authentications',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(regThunk(values))
        }
    });

    return (
        <div className='auth__form'>
            <form className="auth__form__signup" onSubmit={formik.handleSubmit}>
                <input
                    className='auth__form-elem'
                    id="company"
                    name="company"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={()=>{formik.values.company == '' && formik.setFieldValue('company','Company Name*')}}
                    value={formik.values.company}
                    onClick={()=>{formik.values.company =='Company Name*' && formik.setFieldValue('company','')}}
                />
                {formik.touched.company && formik.errors.company ? <div className='auth__form-errorMessage'>{formik.errors.company}</div> : null}
                <input
                    className='auth__form-elem'
                    id="role"
                    name="role"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={()=>{formik.values.role == '' && formik.setFieldValue('role','Your role at the company')}}
                    value={formik.values.role}
                    onClick={()=>{formik.values.role =='Your role at the company' && formik.setFieldValue('role','')}}
                />
                <input
                    className='auth__form-elem'
                    id="number"
                    name="number"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={()=>{formik.values.number == '' && formik.setFieldValue('number','Number of expected monthly authentications')}}
                    value={formik.values.number}
                    onClick={()=>{formik.values.number =='Number of expected monthly authentications' && formik.setFieldValue('number','')}}
                />
                <input
                    className='auth__form-elem'
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={()=>{formik.values.email == '' && formik.setFieldValue('email','Email Address*')}}
                    value={formik.values.email}
                    onClick={()=>{formik.values.email =='Email Address*' && formik.setFieldValue('email','')}}
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
                onClick={()=>{setSwitchState(formik.values.rememberMe)}}/>
                <label htmlFor='rememberMe' className={switchBtn}/><div className='switch-btn-label'>Remember Me</div></div>


                <button className='auth__form-submit' type="submit">Sign Up</button>
            </form>
            <div className='auth__form__bottom'>
                <div className='auth__form__bottom-message'>Already have an account?&nbsp;</div>
                <div className='auth__form__bottom-button' onClick={()=>{navigate('../auth/signin')}}>Sign in</div>
            </div>
        </div>
    )
}

export default SignUp