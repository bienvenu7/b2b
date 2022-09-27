import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './BlockComponentLayout.scss'




const BlockComponentLayout = ({children}) => {

  const [size, setSize] = useState(false)

  useEffect (() => {
    window.innerWidth <= 520 && setSize(true);
  }, [])

  console.log(size)

  return <div 
  // style={window.location.pathname !== "dashboard" && {width: '100vw'}}
  className={window.location.pathname === "/dashboard" ? 'block' : 'block resize'}>{children}</div>
}

export default BlockComponentLayout