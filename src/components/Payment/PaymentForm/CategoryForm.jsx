import { Formik, Field, Form, useFormikContext } from "formik"
import { useState, useEffect } from "react"
import * as NumericInput from 'react-numeric-input'
import { useDispatch, useSelector } from "react-redux"
import { addCategory } from "../../../redux/reducers/payment-reducer"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getProductType } from "../../../redux/selectors/payment-selectors"
import FormObserver from "./FormObserver"

const CategoryForm = (props) => {

    const [volume, setVolume] = useState(50)

    const dispatch = useDispatch()
    const userId = useSelector(getUserId)
    const productType = useSelector(getProductType)


    //temp info

    const cost = 2

    useEffect(() => {

    }, [props.but])

    let but = props.but

    const handlePost = (formik) => {
        const data = { productType: productType, answerTime: Number(formik.values.hours), volume: volume, userId: userId, isGift: false }
        formik.values.hours != '' && dispatch(addCategory(data))
        formik.values.hours = ''
        formik.values.category = ''
        formik.values.typeOfShoes = ''
        setVolume(50)
    }


    return (
        <Formik
            initialValues={{}}
            validate={values => {

            }}
            change={() => {
                console.log('hello')
            }}
            onSubmit={(values, { setSubmitting }) => {
                const data = { productType: productType, answerTime: Number(values.hours), volume: volume, userId: userId, isGift: false }
                dispatch(addCategory(data))
                console.log(data)
                setSubmitting(false);
            }}
        >
            {props => (<Form className="payment__form" onSubmit={props.handleSubmit} onChange={props.change}>
                <div className="payment__form-block-container first">
                    <label htmlFor="category" className="payment__form-label">Choose the category</label>
                    <Field className="payment__form-elem selector" as="select" name="category" id="category" onChange={props.handleChange}>
                        <option value="">Please select the category</option>
                        <option value="bagsWallets">Bags / wallets</option>
                        <option value="hypeShoes">Hype shoes</option>
                        <option value="luxuryShoes">Luxury shoes</option>
                        <option value="jewellery">Jewellery</option>
                        <option value="Watches">Watches</option>
                    </Field>

                    {(props.values.category == "hypeShoes" || props.values.category == "luxuryShoes") && <div className="payment__form-elem shoes-vars">
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