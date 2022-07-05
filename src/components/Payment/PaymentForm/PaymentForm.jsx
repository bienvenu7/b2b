import { useFormik } from "formik"

const PaymentForm = () => {

    const formik = useFormik({
        initialValues: {
            category: 'please select category'
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div className="payment__form-wrapper">
            <form className="payment__form" onSubmit={formik.handleSubmit}>
                <label htmlFor="category" className="payment__form-label">Choose the category</label>
                <select
                    name="category"
                    id="category"
                    value='hello'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    >
                    <option value="red" label="red">
                        red
                    </option>
                    <option value="blue" label="blue">
                        blue
                    </option>
                    <option value="green" label="green">
                        green
                    </option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PaymentForm