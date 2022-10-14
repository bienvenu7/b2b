import React, {useState} from 'react';

import './Discount.scss'

import './multiselect/MultiSelect.scss'

import { getBrandsListThunk, getProductTypes } from '../../redux/thunks/product-thunk';

import Select from 'react-select';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypesOfProduct, takeBrandsList } from '../../redux/selectors/product-selectors';
import MultiSelect from './multiselect/MultiSelect';

const Discount = () => {

    const [noCondition, setNoCondition] = useState(false)
    const [enableCategory, setEnableCategory] = useState(true)
    const [enableAnswerTime, setEnableAnswerTime] = useState(true)
    const [enableBrand, setEnableBrand] = useState(true)

    //input forms
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const [discountName, setDiscountName] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState('')

    const productTypes = useSelector(getTypesOfProduct)

    const productTypesOptions = productTypes.map((i) => {
        return {label: i.publicName, value: i}
    })

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmail = (event) => {
        if (!isValidEmail(event.target.value)) {
          setError(true);
        } else {
          setError(false);
        }
    
        setEmail(event.target.value);
    };

    const handleDiscountName = (event) => {
        setDiscountName(event.target.value)
    }

    const handleDiscountPercentage = (event) => {
        setDiscountPercentage(event.target.value)
    }

    const handleProductTypeSelect = (e) => {
        console.log(e)
    }

    console.log(productTypes)
    console.log(productTypesOptions)
    console.log(noCondition)
    console.log(enableCategory)
    console.log(discountName)
    console.log(discountPercentage)
    



    // useEffect(() => {
    //     dispatch(getBrandsListThunk(1, 9))
    // },[])

    return (
        <div className='discount__block-container'>
            <h1>Discounts</h1>
            <div className="discount__forms">
                <input 
                    type="text" 
                    className='discount__input' 
                    placeholder='Enter discount name'
                    value={discountName}
                    onChange={handleDiscountName}
                />
                <input 
                    type="number" 
                    className='discount__input' 
                    placeholder='Discount percentage value' 
                    min={0} 
                    max={100}
                    value={discountPercentage}
                    onChange={handleDiscountPercentage}
                />
            </div>
            <div className="discount__title">Applies to</div>
            <div className="discount__contents">
                <div className="discount__row">
                    <input onChange={()=> setNoCondition(!noCondition)} type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>No condition</p>
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableCategory(!enableCategory)} disabled={noCondition} type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>Specific categories</p>
                    <MultiSelect disable={enableCategory} options={productTypesOptions}/>
                    {/* <Select
                        isDisabled={enableCategory}
                        isMulti
                        onChange={handleProductTypeSelect} 
                        options={productTypesOptions} 
                        placeholder='Please select categories' 
                        className='react-select-container' 
                        classNamePrefix='react-select'
                        closeMenuOnSelect={false}
                        blurInputOnSelect={false}
                        hideSelectedOptions={false}
                    /> */}
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableBrand(!enableBrand)} disabled={noCondition} type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>Specific brands</p>
                    <Select
                        isDisabled={enableBrand}
                        placeholder='Please select brands' 
                        className='react-select-container' 
                        classNamePrefix='react-select' 
                    />
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableAnswerTime(!enableAnswerTime)} disabled={noCondition} type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>Specific answer time</p>
                    <Select
                        isDisabled={enableAnswerTime}
                        placeholder='Please select answer times' 
                        className='react-select-container' 
                        classNamePrefix='react-select' 
                    />
                </div>
            </div>
            <div className="discount__title">Maximum discount uses</div>
            <div className="discount__contents">
                <div className="discount__row two">
                    <input type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>Limit number of times this discount can be used in total</p>
                    <div className='discount__number'>100</div>
                </div>
                <div className="discount__row two">
                    <input type="checkbox" name="" id="" className='discount__checkbox-one'/>
                    <p>Limit to one use per user</p>
                </div>
            </div>
            <div className="discount__title">Customer eligibility</div>
            <div className="discount__contents">
                <div className="discount__row three">
                    <input type="checkbox" name="" id="" className='round-box'/>
                    <p>All customers</p>
                </div>
                <div className="discount__row three">
                    <input type="checkbox" name="" id="" className='round-box'/>
                    <p>Limit to specific customers</p>
                    <input
                        formNoValidate={error}
                        type="email" 
                        name="email"
                        id=""
                        value={email}
                        placeholder='Enter email addresses' 
                        className='email'
                        onChange={handleEmail}
                    />
                </div>
            </div>
            <button className='discount__submit-btn'>
                Save discount
            </button>
        </div>
  );
};

export default Discount;
