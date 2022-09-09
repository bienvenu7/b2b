import React from 'react'
import './CheckBlock.scss'
import BlockComponentLayout from '../../BlockComponentLayout/BlockComponentLayout'
import camera from '../../../common/icons/dashboard/camera.png'

const CheckBlock =({image, textTop, numberTop, textBottom, numberButtom}) => {
  return (
    <BlockComponentLayout>
      <div className='icon'>
        <img src={image} alt="иконка" />
      </div>
      <div className='top-block'>
        <p className='text'>{textTop}</p>
        <p className='number'>{numberTop}</p>
      </div>
      <hr/>
      <div className='bottom-block'>
        <p className='text'> <span className='span'> {numberButtom} </span> {textBottom} </p>
      </div>
    </BlockComponentLayout>
  )
}

export default CheckBlock