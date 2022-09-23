import React from 'react'

import './Order.scss'

import logo from '../../common/images/601.svg'

const upload = [1, 2, 3, 4, 5, 6, 7, 8]

const Order = () => {

  return (
    <div className='order__full-container'>
        <div className="order__container">
            <div className="order__image">
                <img src={logo} alt="legitgrails" />
            </div>
            <div className="order__header">
                <h1>Authentication #[order number]</h1>
                <div className="order__header-details">
                    <h3>Item category</h3>
                    <span>Luxury shoes</span>
                    <h3>Brand</h3>
                    <span>Louis Vuitton</span>
                </div>
            </div>
            <div className='order__text'>Uploaded Images</div>
            <div className="order__upload">
                {upload.map(i => (
                    <div className='auth_request__form__photo-container'>
                        <div key={i} className={`auth_request__form__photo-elem ${i}`}>
                            <label className={'auth_request__form__photo-photolabel required'}>
                                <input className={`auth_request__form__photo-fileInput ${i}`} accept=".png,.jpg,.jpeg" type="file"/>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className='order__text second'>Added Images</div>
            <div className="order__upload second">
                {upload.map(i => (
                    <div className='auth_request__form__photo-container'>
                        <div key={i} className={`auth_request__form__photo-elem ${i}`}>
                            <label className={'auth_request__form__photo-photolabel required'}>
                                <input className={`auth_request__form__photo-fileInput ${i}`} accept=".png,.jpg,.jpeg" type="file"/>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Order