import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotEmailThunk } from '../../../redux/thunks/auth-thunk';

const ForgotPassword = () =>{
 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [send, setSendState] = useState(false)

    const validate = values => {
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
            email: 'Enter your email',
        },
        validate,
        onSubmit: values => {
            dispatch(forgotEmailThunk(values))
            setSendState(true)
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
                    onBlur={() => { formik.values.email == '' && formik.setFieldValue('email', 'Enter your email') }}
                    value={formik.values.email}
                    onClick={() => { formik.values.email == 'Enter your email' && formik.setFieldValue('email', '') }}
                />
                {formik.touched.email && formik.errors.email ? <div className='auth__form-errorMessage'>{formik.errors.email}</div> : null}
                


                <button className='auth__form-submit' type="submit">Reset password</button>
            </form>
            <div className='auth__form__bottom'>
            <div className='wrapper'>
                {send && <div className='auth__form__bottom-message'>We’ve sent you the reset instruction!</div>}
                <div className='auth__form__bottom-button' onClick={()=>{navigate('../auth/signin')}}>Back to login</div></div>
            </div>
        </div>
    )
}

export default ForgotPassword