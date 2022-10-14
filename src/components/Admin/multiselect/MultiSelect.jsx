import React, { useState } from 'react'
import { SvgSelector } from '../../../common/icons/SvgSelector'

import './MultiSelect.scss'

const MultiSelect = (props) => {

    const [showOptions, setShowOptions] = useState(false)

    const checked = [];

    const handleChecked = (option) => {

        const verify = checked.findIndex((item) => item.label === option.label);
        checked.length > 0 && console.log(checked.findIndex((item) => item.label === option.label) >= 0)
        
        if(verify >= 0) {
            checked.splice(verify, 1)
        }else {
            checked.push(option)
        }
        console.log(checked)
    }
    

  return (
    <div className={props.disable ? 'select__container disable' : 'select__container'}>
        <div onClick={()=> setShowOptions(!showOptions)} className="select__form">
            Please select categories
            <div className={showOptions ? "svg-down" : ""}><SvgSelector id="downArrow2"/></div>
        </div>
        {showOptions && <div className="select__list">
            {props.options?.map((option) => (
                <div key={option.label} onClick={() => handleChecked(option)} className="select__option">
                    <div className="select__option-label">
                        {option.label}
                    </div>
                    <div className="select__option-selected">
                        <div className="svg-checked">
                            <SvgSelector id="checked"/>
                        </div>
                    </div>
            </div>
            ))}
        </div>}
    </div>
  )
}

export default MultiSelect