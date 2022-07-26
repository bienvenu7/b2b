import PersonalAreaLayout from "../PersonalAreaLayout"
import SvgSelector from "../../../common/icons/SvgSelector"
import './Authentications.scss'
import storeLogo from '../../../common/images/logo-of-store.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {takeRequests, takeResultStatuses} from "../../../redux/selectors/dashboard-selectors"
import { getProductsThunk, getResultsStatusesThunk } from "../../../redux/thunks/requests-thunk"

const Authentications = (props) => {


    const requests = useSelector(takeRequests)
    const resultStatuses = useSelector(takeResultStatuses)

    const dispatch = useDispatch()

    useEffect(()=>{
        requests === null && dispatch(getProductsThunk())
        resultStatuses === null && dispatch(getResultsStatusesThunk())
    })

    //temp

    const [page, setPage] = useState('complete')
    const [sortData, setSortData] = useState(true)
    const [searchValue, setSearchValue ] = useState()

    function onCompletedClick(){
        setPage('complete')
        const data = {resultStatuses: [resultStatuses.filter(el=>el.name === 'COMPLETED')[0]]}
        dispatch(getProductsThunk(data))
    }

    function onProgressClick(){
        setPage('progress')
        const data = {resultStatuses: resultStatuses.filter(el=> el.name !== 'COMPLETED')}
        dispatch(getProductsThunk(data))
    }

    function handleSort(){
        setSortData(!sortData)
        dispatch(getProductsThunk({sort: `createdAt:${sortData? 'DESC' : 'ASC'}`}))
    }

    function handleFilter(){
        console.log(searchValue)
        const data = {
            search: searchValue,
            resultStatuses: resultStatuses.filter(el=> page === 'progress' ? el.name !== 'COMPLETE' : el.name === 'COMPLETE' )
        }
        dispatch(getProductsThunk(data))
    }
    


    return (
        <>
            <PersonalAreaLayout>
                <div className='authent-container'>
                    <div className='authent__buttons-wrapper'>
                        <div className={page !== 'complete' ? `authent__buttons-elem` : `authent__buttons-elem selected`} onClick={onCompletedClick}>Completed</div>
                        <div className={page !== 'progress' ? `authent__buttons-elem` : `authent__buttons-elem selected`} onClick={onProgressClick}>In progress</div>
                    </div>
                    <div className='authent-wrapper'>
                        <div className='authent__nav-wrapper'>
                            {page === 'progress' ? <div className='authent__nav-label'>In progress authentications</div> : <div className='authent__nav-label'>Completed authentications</div>}
                            <input className='authent__nav-search' placeholder='Search' onChange={(e)=>setSearchValue(e.target.value)}/>
                            <div className='authent__nav__buttons-wrapper'>
                                <div className='authent__nav__buttons__elem-wrapper' onClick={handleFilter}><SvgSelector id='filter-icon' />Filter</div>
                                {page === 'complete' && <div className='authent__nav__buttons__elem-wrapper'><SvgSelector id='download-icon' />Download</div>}
                            </div>
                        </div>
                        {page === 'complete' && <div className="authent__table">
                            <div className="authent__table__label-wrapper">
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elem-checkbox">
                                        <input type="checkbox" className='custom-checkbox__table' id='check' />
                                        <label htmlFor="check" />
                                    </div>
                                    <div className="authent__table__label__elem-category">Item category</div>
                                </div>
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elems-brand">Brand</div>
                                    <div className="authent__table__label__elems-model">Model name</div>
                                    <div className="authent__table__label__elems-outcome">Outcome</div>
                                    <div className="authent__table__label__elems-order">Order id</div>
                                    <div className="authent__table__label__elems-date" onClick={handleSort}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                    <div className="authent__table__label__elems-pdf">Pdf certificate</div>
                                </div>
                            </div>
                                    {requests && requests.map((el,index)=><div key={index} className="authent__table__elem">
                                    <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-checkbox">
                                            <input key={index} type="checkbox" className='custom-checkbox__table' id={`check-for-elem-${index}`} />
                                            <label htmlFor={`check-for-elem-${index}`} />
                                        </div>
                                        <div className="authent__table__elem__category">
                                            <div className="authent__table__elem__category-image">
                                                {/*<img src={el.image} alt="" />*/}
                                            </div>
                                            <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                            <div className="authent__table__elem__category-number">{/*el.number*/}</div>
                                        </div>
                                    </div>
                                    <div className="authent__table__elems-wrapper">
                                        <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                        <div className="authent__table__elem-model">{el.modelName}</div>
                                        
                                        <div className="authent__table__elem-outcome">{/*el.outcome*/}</div>
                                        <div className="authent__table__elem-order">{/*el.order*/}</div>
                                        <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate()+'/'+(Number((new Date(el.createdAt)).getMonth())+1)+'/'+(new Date(el.createdAt)).getYear()}</div>
                                        <div className="authent__table__elem-pdf">{/*el.pdf ? 'View' : 'Add certificate'*/}</div>
                                    </div>
                                </div>)}
                        </div>}

                        {page !== 'complete' && <div className="authent__table">
                            <div className="authent__table__label-wrapper">
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elem-category">Item category</div>
                                </div>
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elems-brand">Brand</div>
                                    <div className="authent__table__label__elems-model">Model name</div>
                                    <div className="authent__table__label__elems-status">Status</div>
                                    <div className="authent__table__label__elems-answer">Answer time</div>
                                    <div className="authent__table__label__elems-date" onClick={handleSort}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                </div>
                            </div>
                                    {requests && requests.map((el,index)=> <div key={index} className="authent__table__elem">
                                    <div className="authent__table__elems-wrapper">
                                        <div className="authent__table__elem__category">
                                            <div className="authent__table__elem__category-image">
                                                {/*<img src={el.image} alt="" />*/}
                                            </div>
                                            <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                            <div className="authent__table__elem__category-number">{/*el.number*/}</div>
                                        </div>
                                    </div>
                                    <div className="authent__table__elems-wrapper">
                                        <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                        <div className="authent__table__elem-model">{el.modelName}</div>
                                        <div className="authent__table__elem-status">{el.resultStatus.publicName}</div>
                                        <div className="authent__table__elem-answer">{el.answerTime} hours</div>
                                        <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate()+'/'+(Number((new Date(el.createdAt)).getMonth())+1)+'/'+(new Date(el.createdAt)).getYear()}</div>
                                    </div>
                                </div>)}
                        </div>}
                    </div>
                </div>
            </PersonalAreaLayout>
        </>
    )
}

export default Authentications