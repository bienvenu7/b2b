const AuthBalance = (props) => {
    return (
        <div className="auth__balance-wrapper" style={{marginTop: props.mt}}>
            <div className="auth__balance__header">Your authentication balance</div>
            <div className="auth__balance__elem-wrapper">
                <div className="auth__balance__elem">
                    <div className="auth__balance__elem-cat">Bags</div>
                    <div className="auth__balance__elem-hours">12 h</div>
                    <div className="auth__balance__elem-count">100</div>
                </div>
                <div className="auth__balance__elem">
                    <div className="auth__balance__elem-cat">Bags</div>
                    <div className="auth__balance__elem-hours">12 h</div>
                    <div className="auth__balance__elem-count">100</div>
                </div>
                <div className="auth__balance__elem">
                    <div className="auth__balance__elem-cat">Bags</div>
                    <div className="auth__balance__elem-hours">24 h</div>
                    <div className="auth__balance__elem-count">100</div>
                </div>
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