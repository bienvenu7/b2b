import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages, getCartTotal } from "../../redux/selectors/payment-selectors"
import PaymentForm from "../../components/Payment/PaymentForm/PaymentForm"
import { getCartTotalThunk, getPriceThunk } from "../../redux/thunks/payment-thunk"
import { getProductTypesThunk } from "../../redux/thunks/product-thunk"
import { getIsAuth } from "../../redux/selectors/auth-selectors"
import Balance from "../../components/Balance/Balance"
import './TopUpBundle.scss'
import Summary from "../../components/Summary/Summary"
import logo from '../../common/images/logo-for-mobile.png'

const TopUpBundle = (props) => {

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

    useEffect(() => {
        isAuth && dispatch(getProductTypesThunk(1, 1000))
    }, [])

    useEffect(() => {

    }, [packages.length])

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
            if (data.userTariffPackages) {
                if (data.userTariffPackages.length === 1) {
                    if (data.userTariffPackages[0].productType !== '') {
                        dispatch(getCartTotalThunk(data))
                    }
                }
                else if (data.userTariffPackages.length !== 0) {
                    dispatch(getCartTotalThunk(data))
                }
            }
            else {
                dispatch(getCartTotalThunk(data))
            }
        }, 1000))
    }

    const getPrice = (data) => {
        clearTimeout(timerPrice)
        setTimerPrice(setTimeout(() => {
            dispatch(getPriceThunk(data))
        }, 1000))
    }

    return (
        <>
            <div className="top_up_bundle-container">
                <div className="top_up_bundle__left-wrapper">
                    <div className="top_up_bundle__header">
                        <img src={logo} alt='' className="top_up_bundle__header-logo" />
                        <div className="top_up_bundle__header__history">
                            <div className="top_up_bundle__header__history-text bold">Authentication Bundle</div>
                            <div className="top_up_bundle__header__history-text">&nbsp;{'>'}&nbsp;Payment</div>
                        </div>
                    </div>
                    <PaymentForm btnAdd={addButState} btnPay={payButState} cartTotal={calcCartTotal} getPrice={getPrice} />
                </div>
                <div className="top_up_bundle__right-wrapper">
                    <Balance />
                    {packages.length > 0 && <div style={{ margin: '84px 0' }}><Summary /></div>}
                    <div className="top_up_bundle__summary-wrapper"></div>
                    <div className="top_up_bundle__total-wrapper">
                        <div className="top_up_bundle__total-title">Subtotal</div>
                        <div className="top_up_bundle__total-count">${total / 100}</div>
                    </div>
                    <div className="top_up_bundle__buttons-wrapper">
                        <button className="top_up_bundle__buttons-button" onClick={() => btnAddToogleClick()}>Add another category</button>
                        <button className="top_up_bundle__buttons-button" onClick={() => btnPayToogleClick()}>Proceed to payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopUpBundle