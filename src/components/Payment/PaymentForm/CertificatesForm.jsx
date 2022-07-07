import { useEffect, useState, useImperativeHandle, forwardRef } from "react"
import { Formik, Form, Field } from 'formik'
import * as NumericInput from "react-numeric-input"
import { useDispatch, useSelector } from "react-redux"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getUserTariffPackages } from "../../../redux/selectors/payment-selectors"
import { postInvoiceThunk } from "../../../redux/thunks/payment-thunk"
import React from "react"

const CertificatesForm = (props, ref) => {

    const [volume, setVolume] = useState(50)

    const dispatch = useDispatch()

    const userId = useSelector(getUserId)
    const userTariffPackages = useSelector(getUserTariffPackages)

    //temp info

    const cost = 2

    const but = props.but


    const sayHi =() =>{
        console.log('hello')
    }


    return (
        <Formik
            initialValues={{}}
            validate={values => {

            }}
            change={() => {

            }}
            onSubmit={(values, { setSubmitting }) => {
                const data = {
                    paymentSystem: "paypal", savePaymentMethod: false, useSavedPaymentMethod: false, successUrl: "https://example.com",
                    cancelUrl: "https://example.com", userTariffPackages: userTariffPackages, userCertificatePackage: { userId: userId, volume: volume, isGift: false }
                }
                dispatch(postInvoiceThunk(data))
                setSubmitting(false);
            }}
        >
            {props => (<Form className="payment__form" onSubmit={props.handleSubmit}>
                <div className="payment__form-block-container second">
                    <label htmlFor="certificates" className="payment__form-label">Authenticity Certificates</label>
                    <Field className="payment__form-elem selector" as="select" name="certificates" id="certificates">
                        <option value="notneeded">Not needed</option>
                        <option value="include">Include for each item</option>
                        <option value="choose">Choose other amount</option>
                    </Field>
                    {props.values.certificates == 'choose' &&
                        <div className="payment__form-elem number-wrapper" id="cert_count">
                            <NumericInput onChange={setVolume} className="payment__form-elem number" id="count" name="certCount" min="1" max="50" value={volume} />
                            <div className="payment__form-elem info">${cost}&nbsp;per certificate</div></div>}

                    <div className="payment__form-elem upload">
                        <div className="payment__form-elem upload-btn">Upload logo</div>
                        <div className="payment__form-elem upload-info">This logo will be added to the certificates</div>
                    </div>
                </div>
                {but && props.submitForm()}
                <button type="submit">proceed</button>
            </Form>)}
        </Formik>
    )
}

export default forwardRef(CertificatesForm)