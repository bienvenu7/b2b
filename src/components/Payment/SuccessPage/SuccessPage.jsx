const SuccessPage = () => {
    return(
        <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className="payment__success__message-h1">it’S a success!</div>
                <div className="payment__success__message-h2">Your bundle authentication order was successful!</div>
                <div className="payment__success__message-h2 last-child">You can start verifying your items right now, or any other time you prefer, 
                just click on the Authentications tab in the side menu.</div>
                <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem">Start authentication</div>
                    <div className="payment__success__buttons-elem">View all authentications</div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage