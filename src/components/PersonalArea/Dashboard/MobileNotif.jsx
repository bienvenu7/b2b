import React from 'react'
import SvgSelector from '../../../common/icons/SvgSelector'
import Notification from '../notifications/Notifications'

const MobileNotif = ({setShowNotif}) => {
  return (
    <div className='mobile-notif__wrapper'>
        <div className='remove' onClick={() => setShowNotif(false)}><SvgSelector id="cross-icon"/></div>
        <div className='mobile-notif__card-wraper'>
            <Notification/>
        </div>
    </div>
  )
}

export default MobileNotif