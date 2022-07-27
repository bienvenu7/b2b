import PersonalAreaLayout from "../PersonalAreaLayout"
import SvgSelector from "../../../common/icons/SvgSelector"
import './Authentications.scss'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { takeProducts, takeResultStatuses } from "../../../redux/selectors/product-selectors"
import { getProductsThunk } from "../../../redux/thunks/product-thunk"
import { setProducts } from "../../../redux/reducers/product-reducer"

const Authentications = (props) => {


    const products = useSelector(takeProducts)
    const resultStatuses = useSelector(takeResultStatuses)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [page, setPage] = useState(null)

    useEffect(()=>{
        setPage(params.page === 'completed' ? 'complete' : params.page === 'in-progress' && 'progress')
    })

    useEffect(() => {
        console.log(params.page)
        console.log(sortData)
        products === null && resultStatuses !== null && dispatch(getProductsThunk(
          {resultStatuses: resultStatuses.filter(el=> params.page === 'completed' ? el.name === 'COMPLETED' : el.name !== 'COMPLETED'),
          sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`}))
        
    },)

    useEffect(()=>{
        return()=>{
            dispatch(setProducts(null))
        }
    },[])

    

    
    const [sortData, setSortData] = useState(true)
    const [searchValue, setSearchValue] = useState()


    function onCompletedClick() {
        setSortData(true)
        navigate('../authentications/completed')
        const data = { resultStatuses: [
            resultStatuses.filter(el => el.name === 'COMPLETED')[0]],
        sort:  'createdAt:DESC'}
        dispatch(setProducts(null))
        dispatch(getProductsThunk(data))
    }

    function onProgressClick() {
        navigate('../authentications/in-progress')
        const data = { 
            sort:  'createdAt:DESC',
            resultStatuses: resultStatuses.filter(el => el.name !== 'COMPLETED') }
        dispatch(setProducts(null))
        dispatch(getProductsThunk(data))
    }

    function handleSort(sort) {
        setSortData(!sortData)
        dispatch(getProductsThunk({ 
            resultStatuses: resultStatuses.filter(el => page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED'),
            sort: `createdAt:${!sort ? 'DESC' : 'ASC'}` }))
    }

    function handleFilter() {
        const data = {resultStatuses: resultStatuses.filter(el => page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED')
        }
        dispatch(getProductsThunk(searchValue!== '' ? {...data, search: searchValue}: data))
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
                            <input className='authent__nav-search' placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} />
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
                                    <div className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`} onClick={()=>handleSort(sortData)}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                    <div className="authent__table__label__elems-pdf">Pdf certificate</div>
                                </div>
                            </div>
                            {products && products.map((el, index) => <div key={index} className="authent__table__elem">
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-checkbox">
                                        <input key={index} type="checkbox" className='custom-checkbox__table' id={`check-for-elem-${index}`} />
                                        <label htmlFor={`check-for-elem-${index}`} />
                                    </div>
                                    <div className="authent__table__elem__category" onClick={()=>navigate(`../request/${el.id}`)}>
                                        <div className="authent__table__elem__category-image">
                                            {/*<img src={el.image} alt="" />*/}
                                        </div>
                                        <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                        <div className="authent__table__elem__category-number">#{el.publicId}</div>
                                    </div>
                                </div>
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                    <div className="authent__table__elem-model">{el.modelName}</div>
                                    <div className="authent__table__elem-outcome">{/*el.outcome*/}</div>
                                    <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate() + '/' + (Number((new Date(el.createdAt)).getMonth()) + 1) + '/' + (new Date(el.createdAt)).getYear()}</div>
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
                                    <div className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`} onClick={()=>handleSort(sortData)}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                </div>
                            </div>
                            {products && products.map((el, index) => <div key={index} className="authent__table__elem">
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem__category" onClick={()=>navigate(`../request/${el.id}`)}>
                                        <div className="authent__table__elem__category-image">
                                            {/*<img src={el.image} alt="" />*/}
                                        </div>
                                        <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                        <div className="authent__table__elem__category-number">#{el.publicId}</div>
                                    </div>
                                </div>
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                    <div className="authent__table__elem-model">{el.modelName}</div>
                                    <div className="authent__table__elem-status">{el.resultStatus.publicName}</div>
                                    <div className="authent__table__elem-answer">{el.answerTime} hours</div>
                                    <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate() + '/' + (Number((new Date(el.createdAt)).getMonth()) + 1) + '/' + (new Date(el.createdAt)).getYear()}</div>
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