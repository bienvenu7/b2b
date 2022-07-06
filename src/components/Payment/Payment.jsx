import { useState } from "react"
import AuthBalance from "./AuthBalance/AuthBalance"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"

const Payment = () => {

    const [submit, setSubmit] = useState(false)

    return (
        <div className="payment-wrapper">
            <PaymentHeader />
            <div className="payment__content-container">
                <PaymentForm submit={submit}/>
                <AuthBalance />
            </div>
            <div className="payment__footer">
                <div className="payment__footer-container">
                    <div className="payment__footer-cost">
                        <label className="payment__footer-cost-label">Subtotal</label>
                        <div className="payment__footer-cost-count" id="count">200$</div>
                    </div>
                    <div className="payment__footer-btn_add">Add another category</div>
                    <div className="payment__footer-btn_submit" onClick={()=>{setSubmit(true)}}>Proceed to payment</div>
                </div>
            </div>
        </div>
    )
}

export default Payment