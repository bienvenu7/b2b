import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages, getCartTotal, getInvoiceLink } from "../../redux/selectors/payment-selectors"
import AuthBalance from "./AuthBalance/AuthBalance"
import PackagesHistory from "./PackagesHistory/PackagesHistory"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"
import { getCartTotalThunk } from "../../redux/thunks/payment-thunk"
import { useNavigate } from "react-router-dom"

const Payment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [submit, setSubmit] = useState(false)

    const packages = useSelector(getUserTariffPackages)
    const total = useSelector(getCartTotal)
    const invoiceLink = useSelector(getInvoiceLink)

    const [addButState, setAddButState] = useState(false)
    const [payButState, setPayButState] = useState(false)
    const [timerCart, setTimerCart] = useState(false)

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

    let page = 'firsst'

    return (
        <>
          <div className="payment-wrapper">
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
            </div>

            
        </>
    )
}

export default Payment