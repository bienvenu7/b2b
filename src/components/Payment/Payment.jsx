import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages, getCartTotal, getInvoiceLink, getTotalPackage, getCosts } from "../../redux/selectors/payment-selectors"
import AuthBalance from "./AuthBalance/AuthBalance"
import PackagesHistory from "./PackagesHistory/PackagesHistory"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"
import { getCartTotalThunk, postInvoiceThunk } from "../../redux/thunks/payment-thunk"
import { useNavigate } from "react-router-dom"

const Payment = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [submit, setSubmit] = useState(false)

    const packages = useSelector(getUserTariffPackages)
    const total = useSelector(getCartTotal)
    const invoiceLink = useSelector(getInvoiceLink)
    const totalPackage = useSelector(getTotalPackage)
    const costs = useSelector(getCosts)

    const [addButState, setAddButState] = useState(false)
    const [payButState, setPayButState] = useState(false)
    const [timerCart, setTimerCart] = useState(false)
    
    const [saveBilling, setSaveBilling] = useState(false)
    const [method, setMethod] = useState()


    useEffect(() => {
        const data = {
            userTariffPackages: packages
        }
        packages.length > 0 && dispatch(getCartTotalThunk(data))
    }, [packages])

    invoiceLink != null && window.open(invoiceLink)

    const btnAddToogleClick = () => {
        setAddButState(true)
        setTimeout(() => {
            setAddButState(false)
        }, 1)
    }

    const btnPayToogleClick = () => {
        setPayButState(true)
        setTimeout(() => {
            setPayButState(false)
        }, 1)
    }

    const calcCartTotal = (data) => {
        clearTimeout(timerCart)
        setTimerCart(setTimeout(() => {
            dispatch(getCartTotalThunk(data))
        }, 1000))

    }

    const setPayMethod = (e) => {
        setMethod(e.target.value)
    }

    const postInvoice = () => {
        if (totalPackage != {}) {
            const data = { ...totalPackage, paymentSystem: method, savePaymentMethod: saveBilling }
            dispatch(postInvoiceThunk(data))
        }
    }

    //let page = 'first'

    return (
        <>
            {props.page != 'first' && <><div className="payment-wrapper">
                <PaymentHeader />
                <div className="payment__content-container">
                    {packages.length > 0 && <PackagesHistory />}
                    <PaymentForm btnAdd={addButState} btnPay={payButState} cartTotal={calcCartTotal} />
                    <AuthBalance />
                </div>
                <div className="payment__footer">
                    <div className="payment__footer-container">
                        <div className="payment__footer-cost">
                            <label className="payment__footer-cost-label">Subtotal</label>
                            <div className="payment__footer-cost-count" id="count">${total / 100}</div>
                        </div>
                        <div className="payment__footer-btn_add" onClick={() => btnAddToogleClick()}>Add another category</div>
                        <div className="payment__footer-btn_submit" onClick={() => btnPayToogleClick()}>Proceed to payment</div>
                    </div>
                </div>
            </div></>}
            {props.page == 'first' && <>
                <div className="payment_first-container">
                    <div className="payment_first__bundle-wrapper">
                        <PaymentHeader />
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
                            <input type="checkbox" className="custom-checkbox" id="saveBilling" name="saveBilling" checked={saveBilling} onChange={()=>setSaveBilling(!saveBilling)}/>   
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
                            {totalPackage != null && totalPackage.userTariffPackages.map((e, index) => <div className="payment_first__order-packages-elem">
                                <div className="photo">
                                    img
                                </div>
                                <div className="label">{e.productType.publicName}</div>
                                <div className="hours">{e.answerTime} hours</div>
                                <div className="cost">{e.volume} * {costs[index].package / 100}</div>
                            </div>)}
                        </div>
                        <div className="payment_first__order__promocode-wrapper">
                            <input className="payment_first__order__promocode-elem" placeholder="add promocode" />
                        </div>
                        <div className="payment_first__order__subtotal-wrapper">
                            <label className="payment_first__order__subtotal-label">Subtotal</label>
                            <div className="payment_first__order__subtotal-count" id="count">${total / 100}</div>
                        </div>
                        <div className="payment_first__order__button-wrapper">
                            <div className="button" onClick={postInvoice}>Pay now</div>
                        </div>
                        <div className="payment_first__order__error-wrapper">
                            <div className="payment_first__order__error-h1">Payment unsuccessful</div>
                            <div className="payment_first__order__error-h2">Please try again!</div>
                        </div>
                    </div>
                </div>

            </>
            }

        </>
    )
}

export default Payment