import React from 'react'
import './CheckBlockMobile.scss'
import BlockComponentLayout from '../../BlockComponentLayout/BlockComponentLayout'
import camera from '../../../common/icons/dashboard/camera.png'

const CheckBlockMobile =({image}) => {
  return (
    <BlockComponentLayout>
      <div className='check-mobile__icon'>
        <img src={image} alt="иконка" />
      </div>
      <div className='check-mobile__top-block'>
        <p className='check-mobile__text'>Completed authentications</p>
        <p className='check-mobile__number'>900</p>
      </div>
      <div className='check-mobile__bottom-block'>
        <p className='check-mobile__text'>Additional photos needed</p>
        <p className='check-mobile__number'>200</p>
      </div>
    </BlockComponentLayout>
  )
}

export default CheckBlockMobile