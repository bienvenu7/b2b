import React from 'react'

import './Mychips.scss'

import {SvgSelector} from '../../../common/icons/SvgSelector' 

const MyChips = ({tag}) => {
  
  return (
    <div className='chips__container'>
        <div className="chips__email">
            {tag}
        </div>
        <div className="chips__close">
            <SvgSelector id='cross-chips'/>
        </div>
    </div>
  )
}

export default MyChips