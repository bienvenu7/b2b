import { Formik, Field, Form } from "formik"
import { useState } from "react"
import * as NumericInput from 'react-numeric-input'
import { useSelector } from "react-redux"
import { getIsAuth } from "../../../redux/selectors/auth-selectors"

const PaymentForm = (props) => {

    const [volume, setVolume] = useState(50)
    const [certCount, setCertCount] = useState(50)

    const isAuth = useSelector(getIsAuth)
    const submit = props.submit

    return (
        <div className="payment__form-wrapper">
            <Formik
                initialValues={{}}
                validate={values => {

                }}
                change={() => {
                    console.log('hello')
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const data = { ...values, volume: volume, certCount: certCount }
                    console.log(data)
                    setSubmitting(false);
                }}
            >
                {props => (
                    <Form className="payment__form">
                        <div className="payment__form-block-container first">
                            <label htmlFor="category" className="payment__form-label">Choose the category</label>
                            <Field className="payment__form-elem selector" as="select" name="category" id="category">
                                <option value="bagswallets">Bags / wallets</option>
                                <option value="hypeShoes">Hype shoes</option>
                                <option value="luxuryShoes">Luxury shoes</option>
                                <option value="jewellery">Jewellery</option>
                                <option value="Watches">Watches</option>
                            </Field>

                            {props.values.category == "hypeShoes" &&<div className="payment__form-elem shoes-vars">
                                <label htmlFor="types" className="payment__form-label">Choose the category</label>

                                <div className="payment__form-radio_btn_types-container">
                                    <div className="payment__form-radio_btn_types" id="types">
                                        <Field type="radio" name="typeOfShoes" value="sneakers" id="sneakers" />
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
                                <div className="payment__form-elem info">2.00</div>
                            </div>
                            <div className="payment__form-href" onClick={() => { console.log('navto') }}>How does our pricing work?</div>
                        </div>
                        <div className="payment__form-block-container second">
                            <label htmlFor="certificates" className="payment__form-label">Authenticity Certificates</label>
                            <Field className="payment__form-elem selector" as="select" name="certificates" id="certificates">
                                <option value="notneeded">Not needed</option>
                                <option value="include">Include for each item</option>
                                <option value="choose">Choose other amount</option>
                            </Field>
                            {props.values.certificates == 'choose' &&
                                <div className="payment__form-elem number-wrapper" id="cert_count">
                                    <NumericInput onChange={setCertCount} className="payment__form-elem number" id="count" name="certCount" min="1" max="50" value={certCount} />
                                    <div className="payment__form-elem info">2.00</div></div>}

                            <div className="payment__form-elem upload">
                                <button className="payment__form-elem upload-btn">Upload logo</button>
                                <div className="payment__form-elem upload-info">This logo will be added to the certificates</div>
                            </div>
                        </div>
                    </Form>)}
            </Formik>
        </div>
    )
}

export default PaymentForm