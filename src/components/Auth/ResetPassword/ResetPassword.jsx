import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SvgSelector from '../../../common/icons/SvgSelector';

const ResetPassword = () => {

    const [typeOfNew, setTypeNew] = useState('text')
    const [typeOfConfirm, setTypeConfirm] = useState('text')

    const navigate = useNavigate()

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
            password: 'New password',
            confirm: 'Confirm password'
        },
        validate,
        onSubmit: values => {
            console.log(values)
        }
    });

    return (
        <div className='auth__form'>
            <form className="auth__form__reset" onSubmit={formik.handleSubmit}>
                <input
                    className='auth__form-elem'
                    id="password"
                    name="password"
                    type={typeOfNew}
                    onChange={formik.handleChange}
                    onBlur={() => { formik.values.password == '' && formik.setFieldValue('password', 'New password') && setTypeNew('text') }}
                    value={formik.values.password}
                    onClick={() => { if(typeOfNew == 'text'){setTypeNew('password'); formik.setFieldValue('password', '') }}}
                />
                {formik.touched.password && formik.errors.password ? <div className='auth__form-errorMessage'>{formik.errors.password}</div> : null}
                <input
                    className='auth__form-elem'
                    id="confirm"
                    name="confirm"
                    type={typeOfConfirm}
                    onChange={formik.handleChange}
                    onBlur={() => { formik.values.confirm == '' && formik.setFieldValue('confirm', 'Confirm password') && setTypeConfirm('text') }}
                    value={formik.values.confirm}
                    onClick={() => { if(typeOfConfirm == 'text'){setTypeConfirm('password'); formik.setFieldValue('confirm', '') }}}
                />
                {formik.touched.password && formik.touched.confirm && formik.values.password != formik.values.confirm ? <div className='auth__form-errorMessage'>The passwords do not match!</div> : null}

                <button className='auth__form-submit' type="submit">Reset</button>
            </form>
            <div className='auth__form__bottom-signin'>
                <div className='wrapper'><div className='auth__form__bottom-message'></div>
                <div className='auth__form__bottom-button' onClick={()=>{navigate('../auth/signin')}}><SvgSelector id='backIcon'/>&nbsp;Back to login</div></div>
            </div>
        </div>
    )
}

export default ResetPassword