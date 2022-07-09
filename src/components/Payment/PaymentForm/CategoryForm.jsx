import { Formik, Field, Form, useFormikContext } from "formik"
import { useState, useEffect } from "react"
import * as NumericInput from 'react-numeric-input'
import { useDispatch, useSelector } from "react-redux"
import { addCategory } from "../../../redux/reducers/payment-reducer"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getProductType } from "../../../redux/selectors/payment-selectors"
import { getTypesOfProduct } from "../../../redux/selectors/product-selectors"
import Select, { getValue } from 'react-select'

const CategoryForm = (props) => {

    const [volume, setVolume] = useState(50)

    const dispatch = useDispatch()
    const userId = useSelector(getUserId)
    const productType = useSelector(getProductType)
    const productTypes = useSelector(getTypesOfProduct)

    const options = [
        { value: productTypes[1], label: "Bags / wallets" },
        { value: productTypes[2], label: 'Hype shoes' },
        { value: productTypes[0], label: 'Luxury shoes' },
        { value: productTypes[3], label: 'Jewellery' },
        { value: productTypes[4], label: 'Watches' },
    ]

    const [selectedValue, setSelectedValue] = useState(3);

    const handleChange = e => {
        setSelectedValue(e.value);
    }

    //temp info

    const cost = 2

    useEffect(() => {

    }, [props.but])

    let but = props.but

    const handlePost = (formik) => {
        const data = { productType: selectedValue, answerTime: Number(formik.values.hours), volume: volume, userId: userId, isGift: false }
        formik.values.hours != '' && dispatch(addCategory(data))
        formik.values.hours = ''
        formik.values.typeOfShoes = ''
        setVolume(50)
    }

    console.log(selectedValue)

    return (
        <Formik
            initialValues={{}}
            validate={values => {

            }}
            change={() => {
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >
            {props => (<Form className="payment__form" onSubmit={props.handleSubmit} onChange={props.change}>
                <div className="payment__form-block-container first">
                    <label htmlFor="category" className="payment__form-label">Choose the category</label>
                    <Select placeholder='Please select the category' options={options} onChange={handleChange} />

                    {(selectedValue == 2 || selectedValue == "luxuryShoes") && <div className="payment__form-elem shoes-vars">
                        <label htmlFor="types" className="payment__form-label">Choose the category</label>

                        <div className="payment__form-radio_btn_types-container">
                            <div className="payment__form-radio_btn_types" id="types">
                                <Field type="radio" name="typeOfShoes" value="sneakers" id="sneakers" onChange={props.handleChange} />
                                <label htmlFor="sneakers">Sneakers</label>
                            </div>
                            <div className="payment__form-radio_btn_types">
                                <Field type="radio" name="typeOfShoes" value="other" id="other" />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                    </div>}

                    <label htmlFor="hours" className="payment__form-label">Choose answer time</label>
                    <div className="payment__form-elem hours">
                        <div className="payment__form-radio_btn">
                            <Field type="radio" name="hours" value="12" id="12h" />
                            <label htmlFor="12h">12 hours</label>
                        </div>
                        <div className="payment__form-radio_btn">
                            <Field type="radio" name="hours" value="24" id="24h" />
                            <label htmlFor="24h">24 hours</label>
                        </div>
                    </div>
                    <label htmlFor="volume" className="payment__form-label">Choose the volume of authentications</label>
                    <div className="payment__form-elem number-wrapper">
                        <NumericInput onChange={setVolume} className="payment__form-elem number" id="volume" name="volume" min="1" max="50" value={volume} />
                        <div className="payment__form-elem info">${cost}&nbsp;per authentication</div>
                    </div>
                    <div className="payment__form-href" onClick={() => { console.log('navto') }}>How does our pricing work?</div>
                </div>
                {but && handlePost(props)}
            </Form>)}
        </Formik>
    )
}

export default CategoryForm