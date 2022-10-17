import React, {useEffect, useState} from 'react';

import Select from 'react-select';

import './Discount.scss'


import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { getAnswerTime } from '../../api/answerTimes/AnswerTimesApi';

import { getBrandsListThunk } from '../../redux/thunks/product-thunk';

import { getTypesOfProduct, takeBrandsList } from '../../redux/selectors/product-selectors';

import MyChips from './Chips/MyChips';


const icon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.54092 12C4.84039 12 5.07719 11.8666 5.24434 11.6068L11.8259 1.15857C11.9512 0.954944 12 0.800468 12 0.63897C12 0.252779 11.7493 0 11.3662 0C11.0876 0 10.9344 0.0912815 10.7673 0.358104L4.51306 10.4061L1.26756 6.12288C1.09344 5.87712 0.919327 5.77882 0.668601 5.77882C0.271619 5.77882 0 6.05266 0 6.43885C0 6.60035 0.069646 6.78291 0.201973 6.95143L3.8166 11.5927C4.02554 11.8666 4.24144 12 4.54092 12Z" fill="#CBAD73"/>
</svg>

const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid pink',
      color: "black",
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '0.715232px solid #CECECE',
      background: 'transparent',
      color: state.isSelected ? '#CBAD73' : '#565656',
      ':hover': {
          background: 'transparent',
      },
    })
}

const formatOptionLabel = ({ value, label, icon }) => (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <span >{label}</span>
      <div>
        {icon}
      </div>
    </div>
);


const Discount = () => {

    const dispatch = useDispatch()

    const [noCondition, setNoCondition] = useState(false)
    const [enableCategory, setEnableCategory] = useState(true)
    const [enableAnswerTime, setEnableAnswerTime] = useState(true)
    const [enableBrand, setEnableBrand] = useState(true)
    const [enableTotalUsed, setEnableTotalUsed] = useState(true)
    const [limitCostomer, setLimitCostomer] = useState(true)

    // const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [tags, setTags] = useState([])

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [categoryValue, setCategoryValue] = useState([])
    const [brandValue, setBrandValue] = useState([])
    const [answerTimes, setAnswerTime] = useState([])
    const [timeValue, setTimeValue] = useState([])
    const [number, setNumber] = useState(null)

    const productTypes = useSelector(getTypesOfProduct)

    const brands = useSelector(takeBrandsList)

    const productTypesOptions = productTypes.map((i) => {
        return {label: i.publicName, value: i, icon}
    })

    const brandsOptions = brands?.map((brand) => {
        return {label: brand.publicName, value: brand, icon}
    })

    const answerTimesOptions = answerTimes?.map((i) => {
        return {label: i.name, value: i, icon}
    })

    const getTime = async () => {
        try {
            const response = await getAnswerTime();
            setAnswerTime(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        !brands && dispatch(getBrandsListThunk(1, 10));
        getTime()
    }, [])

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // const handleEmail = (event) => {
    //     if (!isValidEmail(event.target.value)) {
    //       setError(true);
    //     } else {
    //       setError(false);
    //     }
    
    //     setEmail(event.target.value);
    // };

    const handleDiscountName = (event) => {
        setName(event.target.value)
    }

    const handleDiscountPercentage = (event) => {
        setPercentage(event.target.value)
    }

    const handleProductTypeSelect = (event) => {
        setCategoryValue(event)
    }

    const handleBrandSelect = (event) => {
        setBrandValue(event)
    }

    const handleAnswerTimes = (event) => {
        setTimeValue(event)
    }

    const addTags = (event) => {
        event.preventDefault()
        if(event.key === 'Enter' && isValidEmail(event.target.value)) {
            setError(false)
            setTags([...tags, event.target.value])
            event.target.value = ''
        }else{
            setError(true)
        }
    }

    function handleSubmit (event) {
        event.preventDefault();
        
        // if(name === "") {
        //     setErrorName(true)
        // }else {
            console.log({name, brand: brandValue, category: categoryValue, percentage, email: tags, time: timeValue, limitNumber: number})

            // clear all of state after submitting

            setBrandValue([])
            setCategoryValue([])
            setTags('')
            setName('')
            setPercentage('')
            setTimeValue([])
            setErrorName(false)

            alert('your discount has been added')
        // }
    }


    console.log(productTypesOptions)
    console.log(brandsOptions)
    console.log(brandValue)
    console.log(categoryValue)
    console.log(answerTimes)
    

    return (
        <form onSubmit={handleSubmit} className='discount__block-container'>
            <h1>Discounts</h1>
            <div className="discount__forms">
                <input 
                    type="text" 
                    className='discount__input' 
                    placeholder='Enter discount name'
                    value={name}
                    onChange={handleDiscountName}
                />
                <input 
                    type="number" 
                    className='discount__input' 
                    placeholder='Discount percentage value' 
                    min={0} 
                    max={100}
                    value={percentage}
                    onChange={handleDiscountPercentage}
                />
            </div>
            <div className="discount__title">Applies to</div>
            <div className="discount__contents">
                <div className="discount__row">
                    <input onChange={()=> setNoCondition(!noCondition)} type="checkbox" name="" id="noCondition" className='discount__checkbox-one'/>
                    <label htmlFor="noCondition">No condition</label>
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableCategory(!enableCategory)} disabled={noCondition} type="checkbox" name="" id="category" className='discount__checkbox-one'/>
                    <label htmlFor='category'>Specific categories</label>
                    {/* <MulproductTypesOptionstiSelect disable={enableCategory} options={productTypesOptions}/> */}
                    <Select
                        isDisabled={enableCategory || noCondition}
                        isMulti
                        onChange={handleProductTypeSelect} 
                        options={productTypesOptions} 
                        placeholder='Please select categories' 
                        className='react-select-container' 
                        classNamePrefix='react-select'
                        closeMenuOnSelect={false}
                        blurInputOnSelect={false}
                        hideSelectedOptions={false}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        value={categoryValue}
                    />
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableBrand(!enableBrand)} disabled={noCondition} type="checkbox" name="" id="brand" className='discount__checkbox-one'/>
                    <label htmlFor='brand'>Specific brands</label>
                    <Select
                        isDisabled={enableBrand || noCondition}
                        isMulti
                        onChange={handleBrandSelect}
                        options={brandsOptions} 
                        placeholder='Please select categories' 
                        className='react-select-container' 
                        classNamePrefix='react-select'
                        closeMenuOnSelect={false}
                        blurInputOnSelect={false}
                        hideSelectedOptions={false}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        value={brandValue}
                    />
                </div>
                <div className="discount__row">
                    <input onChange={() => setEnableAnswerTime(!enableAnswerTime)} disabled={noCondition} type="checkbox" name="" id="time" className='discount__checkbox-one'/>
                    <label htmlFor='time'>Specific answer time</label>
                    <Select
                        isDisabled={enableAnswerTime || noCondition}
                        isMulti
                        options={answerTimesOptions}
                        onChange={handleAnswerTimes}
                        placeholder='Please select answer times' 
                        className='react-select-container' 
                        classNamePrefix='react-select'
                        closeMenuOnSelect={false}
                        blurInputOnSelect={false}
                        hideSelectedOptions={false}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        value={timeValue}
                    />
                </div>
            </div>
            <div className="discount__title">Maximum discount uses</div>
            <div className="discount__contents">
                <div className="discount__row two">
                    <input onChange={() => setEnableTotalUsed(!enableTotalUsed)} type="checkbox" name="" id="limit time" className='discount__checkbox-one'/>
                    <label htmlFor='limit time'>Limit number of times this discount can be used in total</label>
                    <input onChange={(event) => setNumber(event.target.value)} disabled={enableTotalUsed} type='number' min={0} placeholder='100' className='discount__number'/>
                </div>
                <div className="discount__row two">
                    <input type="checkbox" name="" id="limit user" className='discount__checkbox-one'/>
                    <label htmlFor='limit user'>Limit to one use per user</label>
                </div>
            </div>
            <div className="discount__title">Customer eligibility</div>
            <div className="discount__contents">
                <div className="discount__row three">
                    <input type="checkbox" name="" id="all" className='discount__round-box'/>
                    <label htmlFor='all'>All customers</label>
                </div>
                <div className="discount__row three">
                    <input onChange={() => setLimitCostomer(!limitCostomer)} type="checkbox" name="" id="limit customers" className='discount__round-box'/>
                    <label htmlFor='limit customers'>Limit to specific customers</label>
                    <div className="discount__email">
                        <input
                            formNoValidate={error}
                            type="email" 
                            name="email"
                            id=""
                            // value={email}
                            placeholder='Enter email addresses' 
                            className='email'
                            // onChange={handleEmail}
                            onKeyDown={addTags}
                            disabled={limitCostomer}
                        />
                    </div>
                </div>
            </div>
            {tags.length >= 1 && <div className="discount__chips">
                {tags?.map((tag, index) => <MyChips key={index} tag={tag}/>)}
            </div>}
            <button type="submit" value="Submit" className='discount__submit-btn'>
                Save discount
            </button>
        </form>
  );
};

export default Discount;
