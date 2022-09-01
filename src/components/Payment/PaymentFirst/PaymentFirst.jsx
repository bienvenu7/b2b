import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartTotal, getInvoiceLink, getTotalPackage, getCosts, getUserTariffPackages } from "../../../redux/selectors/payment-selectors"
import PaymentHeader from '../PaymentHeader/PaymentHeader'
import { postInvoiceThunk } from "../../../redux/thunks/payment-thunk"
import { useNavigate } from "react-router-dom"
import MobileHeader from "../../Mobile/MobileHeader/MobileHeader"
import { setInvoiceLink } from "../../../redux/reducers/payment-reducer"
import Loader from "../../Loader/Loader"

const PaymentFirst = (props) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()



    const setPayMethod = (e) => {
        setMethod(e.target.value)
    }

    const totalPackage = useSelector(getTotalPackage)
    const costs = useSelector(getCosts)
    const total = useSelector(getCartTotal)
    const invoiceLink = useSelector(getInvoiceLink)
    const userTariffPackages = useSelector(getUserTariffPackages)

    const [method, setMethod] = useState()
    const [saveBilling, setSaveBilling] = useState(false)
    const [buttonState, setButtonState] = useState(true)

    const postInvoice = async () => {
        if (totalPackage !== {} && method) {
            setButtonState(false)
            const data = userTariffPackages.length > 0 ? { ...totalPackage, userTariffPackages: userTariffPackages, paymentSystem: method, savePaymentMethod: saveBilling, useSavedPaymentMethod: false }
                : { ...totalPackage, paymentSystem: method, savePaymentMethod: saveBilling, useSavedPaymentMethod: false }
            const response = await dispatch(postInvoiceThunk(data))
            response === true && setButtonState(true)
            console.log(data)
        }
    }

    if (invoiceLink != null) {
        method === 'stripe' ? window.open(invoiceLink, '_self') : window.open(invoiceLink, '_blank')
        dispatch(setInvoiceLink(null))
    }

    useEffect(() => {
        if (Object.keys(totalPackage).length < 1) {
            navigate('../payment')
        }
    })

    if (Object.keys(totalPackage).length < 1) {
        return <></>
    }


    if (!buttonState) {
        return <Loader />
    }

    return (
        <>
            <MobileHeader label='Authentication payment' />
            <div className="payment_first-container">
                <div className="payment_first__bundle-wrapper">
                    <PaymentHeader />
                    <div className="payment_first__bundle__billing-header">Billing information</div>
                    <div className="payment_first__bundle__billing-wrapper">
                        <div className="payment_first__bundle__billing-elem">
                            <div className="payment_first__bundle__billing-label">Business name</div>
                            <div className="payment_first__bundle__billing-value">Luxury store</div>
                            <div className="payment_first__bundle__billing-button">Change</div>
                        </div>
                        <div className="payment_first__bundle__billing-elem">
                            <div className="payment_first__bundle__billing-label">Billing address</div>
                            <div className="payment_first__bundle__billing-value">XXX, XXX, Estonia</div>
                            <div className="payment_first__bundle__billing-button">Change</div>
                        </div>
                        <div className="payment_first__bundle__billing-elem">
                            <div className="payment_first__bundle__billing-label">VAT number</div>
                            <div className="payment_first__bundle__billing-value">00000000</div>
                            <div className="payment_first__bundle__billing-button">Change</div>
                        </div>
                    </div>
                    <div className="payment_first__bundle__checkbox">
                        <input type="checkbox" className="custom-checkbox" id="saveBilling" name="saveBilling" checked={saveBilling} onChange={() => setSaveBilling(!saveBilling)} />
                        <label htmlFor="saveBilling">Save billing information</label>
                    </div>
                    <div className="payment_first__bundle__vars-wrapper">
                        <div className="payment_first__bundle__vars-h1">Payment</div>
                        <div className="payment_first__bundle__vars-h2">All transactions are secure and encrypted</div>
                        <div className="payment_first__bundle__vars-radio-wrapper">

                            <div className="payment_first__bundle__vars-radio__elem">
                                <input type="radio" name="payMethod" value="stripe" id="stripe" className='custom-radio' onChange={setPayMethod} />
                                <label htmlFor="stripe" />
                                <div className="payment__form-radio_btn_types-label">Stripe</div>
                            </div>

                            <div className="payment_first__bundle__vars-radio__elem">
                                <input type="radio" name="payMethod" value="paypal" id="paypal" className='custom-radio' onChange={setPayMethod} />
                                <label htmlFor="paypal" />
                                <div className="payment__form-radio_btn_types-label">Paypal</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment_first__order-wrapper">
                    <div className="payment_first__order-h1">Order summary</div>
                    <div className="payment_first__order-packages-wrapper">
                        {totalPackage !== null && totalPackage.userTariffPackages && totalPackage.userTariffPackages.map((e, index) => e.productType !== '' && e.answerTime !== '' && <div key={index} className="payment_first__order-packages-elem">
                            <div className="photo">
                                img
                            </div>
                            <div className="label">{e.productType.publicName}</div>
                            <div className="hours">{e.answerTime} hours</div>
                            <div className="cost">{e.volume} * {costs[index] / 100}</div>
                            <div className="total">$ {e.volume * (costs[index] / 100)}</div>
                            <div className="volume">{e.volume} authentications</div>
                        </div>)}
                    </div>
                    <div className="payment_first__order__promocode-wrapper">
                        <input className="payment_first__order__promocode-elem" placeholder="add promocode" />
                    </div>
                    <div className="payment_first__order__subtotal-wrapper">
                        <label className="payment_first__order__subtotal-label">Subtotal</label>
                        <div className="payment_first__order__subtotal-count" id="count">${total / 100}</div>
                    </div>
                    <div className="payment_first__order__error-label">
                        Payment unsuccessful! Please try again.
                    </div>
                    <div className="payment_first__order__button-wrapper">
                        <div className={buttonState ? "button" : "button disabled"} onClick={() => buttonState && postInvoice()}>Pay now</div>
                    </div>
                    <div className="payment_first__order__error-wrapper">
                        <div className="payment_first__order__error-h1">Payment unsuccessful</div>
                        <div className="payment_first__order__error-h2">Please try again!</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentFirst