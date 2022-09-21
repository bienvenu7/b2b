import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './BlockComponentLayout.scss'




const BlockComponentLayout = ({children}) => {

  const [size, setSize] = useState(false)

  useEffect (() => {
    window.innerWidth <= 520 && setSize(!size);
  }, [])

  console.log(size)

  return <div 
  // style={window.location.pathname === "/dashboard" & size ?
  // {marginLeft: '17px', marginRight: '17px', width: 'auto', paddingRight: '20px', paddingLeft: '20px'}
  // :
  // {marginLeft: '0px', marginRight: '0px', width: 'auto', paddingLeft: '12px', paddingRight: '12px'}}
  className={window.location.pathname === "/dashboard" & size ? 'block resize' : 'block'}>{children}</div>
}

export default BlockComponentLayout