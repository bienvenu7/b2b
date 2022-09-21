import React from 'react'
import './BlockComponentLayout.scss'

const BlockComponentLayout = ({children}) => {
  return <div 
  style={window.location.pathname === "/dashboard" ?
  {marginLeft: '17px', marginRight: '17px', width: 'auto', paddingRight: '20px', paddingLeft: '20px'}
  :
  {marginLeft: '0px', marginRight: '0px', width: '100vw', paddingLeft: '12px', paddingRight: '12px'}}
  className='block'>{children}</div>
}

export default BlockComponentLayout