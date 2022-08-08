import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages, getCartTotal } from "../../redux/selectors/payment-selectors"
import AuthBalance from "./AuthBalance/AuthBalance"
import PackagesHistory from "./PackagesHistory/PackagesHistory"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"
import { getCartTotalThunk, getPriceThunk } from "../../redux/thunks/payment-thunk"
import MobileHeader from '../Mobile/MobileHeader/MobileHeader';
import { getProductTypesThunk } from "../../redux/thunks/product-thunk"
import { getIsAuth } from "../../redux/selectors/auth-selectors"
import Balance from "../Balance/Balance"

const Payment = (props) => {

    const dispatch = useDispatch()
    const packages = useSelector(getUserTariffPackages)
    const total = useSelector(getCartTotal)
    const isAuth = useSelector(getIsAuth)

    const [addButState, setAddButState] = useState(false)
    const [payButState, setPayButState] = useState(false)

    const [timerPrice, setTimerPrice] = useState(false)
    const [timerCart, setTimerCart] = useState(false)


    useEffect(() => { 

    }, [total])

    useEffect(()=>{
       isAuth && dispatch(getProductTypesThunk(1, 1000))
    },[])

    useEffect(() => { 

    }, [packages.length])

    //invoiceLink != null && window.open(invoiceLink)

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
            if (data.userTariffPackages){
            if (data.userTariffPackages.length === 1){
                if (data.userTariffPackages[0].productType !== ''){
                    dispatch(getCartTotalThunk(data))
                }
            }
            else if (data.userTariffPackages.length !== 0){
                dispatch(getCartTotalThunk(data))
            }
        }
        else{
            dispatch(getCartTotalThunk(data))
        }
        }, 1000))
    }

    const getPrice = (data) => {
        clearTimeout(timerPrice)
        setTimerPrice(setTimeout(()=>{
            dispatch(getPriceThunk(data))
        }, 1000))
    }

    return (
        <>
        <MobileHeader label='Authentication bundle'/>
            <div className="payment-wrapper">
                <PaymentHeader />
                <div className="payment__content-container">
                    {packages.length > 0 && <PackagesHistory />}
                    <PaymentForm btnAdd={addButState} btnPay={payButState} cartTotal={calcCartTotal} getPrice={getPrice} />
                    {/*<AuthBalance mt={100}/>*/}
                    <Balance/>
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
            </div></>
    )
}

export default Payment