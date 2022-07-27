import PersonalAreaLayout from "../PersonalAreaLayout"
import './PhotoRequests.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { takeAnglesList, takeProducts, takeResultStatuses } from "../../../redux/selectors/product-selectors"
import { getProductsThunk } from "../../../redux/thunks/product-thunk"
import { useNavigate } from "react-router-dom"

const PhotoRequests = (props) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector(takeProducts)
    const resultStatuses = useSelector(takeResultStatuses)
    const anglesList = useSelector(takeAnglesList)

    useEffect(()=>{
        const filter = {resultStatuses: resultStatuses !== null && resultStatuses.filter(el=>el.name === 'UPDATE_NEEDED')}
        resultStatuses !== null && products === null && dispatch(getProductsThunk(filter))   
    })

    function getReasons(reasons){
        if(reasons !== null && anglesList !== null){
            const arr = reasons.split(',').map(el=> anglesList.find(elem=> elem.id === el))
            console.log(arr)
            const total = arr.length > 2 ? arr.map((el,index)=> el !== undefined ? index < 1 ? el.publicName + ', ' : index === 1 ? el.publicName + ` and ${arr.length - 2} more` : '' : null) : arr.map((el,index)=>el !== undefined ? arr.length == (index+1) ? el.publicName : el.publicName + ', ' : null)
            return total
        }
    }


    return (
        <>
            <PersonalAreaLayout>
                <div className="photo_requests-container">
                    <div className="photo_requests-wrapper">
                        <div className="photo_requests-label">Photo requests</div>
                        <div className="photo_requests__table">
                            <div className="photo_requests__table__label-wrapper">
                                <div className="photo_requests__table__label__elem-category">Item category</div>
                                <div className="photo_requests__table__label__elem-brand">Brand</div>
                                <div className="photo_requests__table__label__elem-date">Submission date</div>
                                <div className="photo_requests__table__label__elem-required">Required photos</div>
                            </div>
                            {products !== null && products.map((el,index)=> 
                            <div key={index} className="photo_requests__table__elem">
                                <div className="photo_requests__table__elem__category" onClick={()=>navigate(`../request/${el.id}`)}>
                                    <div className="photo_requests__table__elem__category-image">
                                        <img src='{/*el.image*/}' alt="" />
                                    </div>
                                    <div className="photo_requests__table__elem__category-label">{el.productType.publicName}</div>
                                    <div className="photo_requests__table__elem__category-number">#{el.publicId}</div>
                                </div>
                                <div className="photo_requests__table__elem-brand">{el.brand.publicName}</div>
                                <div className="photo_requests__table__elem-date">{(new Date(el.createdAt)).getDate() + '/' + (Number((new Date(el.createdAt)).getMonth()) + 1) + '/' + (new Date(el.createdAt)).getYear()}</div>
                                <div className="photo_requests__table__elem-required">{getReasons(el.reasons)}</div>
                                <div className="photo_requests__table__elem-button">Upload</div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </PersonalAreaLayout>
        </>
    )
}

export default PhotoRequests