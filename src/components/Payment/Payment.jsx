import { useState } from "react"
import AuthBalance from "./AuthBalance/AuthBalance"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"

const Payment = () => {

    const [submit, setSubmit] = useState(false)

    const [addButState, setAddButState] = useState(false)
    const [payButState, setPayButState] = useState(false)

    const btnAddToogleClick = () => {
        setAddButState(true)
        setTimeout(()=>{
            setAddButState(false)
        }, 1)
    }

    const btnPayToogleClick = () => {
        setPayButState(true)
        setTimeout(()=>{
            setPayButState(false)
        }, 1)
    }

    return (
        <div className="payment-wrapper">
            <PaymentHeader />
            <div className="payment__content-container">
                <PaymentForm btnAdd={addButState} btnPay={payButState}/>
                <AuthBalance />
            </div>
            <div className="payment__footer">
                <div className="payment__footer-container">
                    <div className="payment__footer-cost">
                        <label className="payment__footer-cost-label">Subtotal</label>
                        <div className="payment__footer-cost-count" id="count">200$</div>
                    </div>
                    <div className="payment__footer-btn_add" onClick={()=>btnAddToogleClick()}>Add another category</div>
                    <div className="payment__footer-btn_submit" onClick={()=>btnPayToogleClick()}>Proceed to payment</div>
                </div>
            </div>
        </div>
    )
}

export default Payment