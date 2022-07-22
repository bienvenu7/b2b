import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {takeBalance} from '../../../redux/selectors/authRequest-selectors'

const AuthBalance = (props) => {

    const balance = useSelector(takeBalance)

    useEffect(()=>{

    },[balance])

    return (
        <div className="auth__balance-wrapper" style={{marginTop: props.mt}}>
            <div className="auth__balance__header">Your authentication balance</div>
            <div className="auth__balance__elem-wrapper">
                {balance.map((el, index) => <div key={index} className="auth__balance__elem">
                    <div className="auth__balance__elem-cat">{el.productType.publicName}</div>
                    <div className="auth__balance__elem-hours">{el.answerTime} h</div>
                    <div className="auth__balance__elem-count">{el.volume}</div>
                </div>)}
                <div className="auth__balance__elem">
                    <div className="auth__balance__elem-button">
                        Top up now
                    </div>
                    <div className="auth__balance__elem-button">
                        New Authentication
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthBalance