import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuthThunk, loginThunk, regThunk } from '../../../redux/thunks/auth-thunk';

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = values => {
        const errors = {};
        if (!values.company) {
          errors.company = 'Please fill in your company';
        } 
      
        if (!values.password) {
          errors.password = 'Please fill in your password';
        } else if (values.password.length < 6) {
          errors.password = 'Must be 6 characters or more';
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
            email: '',
            password: '',
            company: '',
            role: '',
            number: '',
        },
        validate,
        onSubmit: values => {
            navigate('../auth/signin')
        }            
    });

    return (

        <div className="form__signup">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="company">Company name</label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.company}
                />
                {formik.touched.company && formik.errors.company ? <div>{formik.errors.company}</div> : null}
                <br/>
                <label htmlFor="role">Your role at the company</label>
                <input
                    id="role"
                    name="role"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                /><br/>
                <label htmlFor="number">Number of expected monthly authentications</label>
                <input
                    id="number"
                    name="number"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.number}
                /><br/>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <br/>
               
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <br/>



                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp