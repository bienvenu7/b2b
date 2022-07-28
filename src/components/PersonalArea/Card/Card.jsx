import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import SvgSelector from '../../../common/icons/SvgSelector'
import { setProduct } from '../../../redux/reducers/product-reducer'
import { takeAnglesList, takeProduct } from '../../../redux/selectors/product-selectors'
import { getProductThunk } from '../../../redux/thunks/product-thunk'
import PersonalAreaLayout from '../PersonalAreaLayout'
import './Card.scss'

const Card = (props) =>{

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const product = useSelector(takeProduct)
    const anglesList = useSelector(takeAnglesList)

    useEffect(()=>{
        dispatch(getProductThunk(params.id))
        return()=>{
            dispatch(setProduct(null))
        }
    },[])

    function getPhotoUrl(file){
        //const domain = 'https://b2b-portal-dev.herokuapp.com'
        return process.env.NODE_ENV !== 'production' ? '/mockimage.png' : '/assets' + file.path + '/' + file.name
    }

    function getDate(str){
        const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
        const date = new Date(Date.parse(str))
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        let month = date.getMonth()
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function getReasons(reasons){
        if(reasons !== null && anglesList !== null){
        const arr = reasons.split(',').map(el=> anglesList.find(elem=> elem.clickupId === el))
        const total = arr.map((el,index)=> el !== undefined ?  arr.length == (index+1) ? el.publicName : el.publicName + ', ' : null)
        return total
        }
        return 'N/A'
    }

    
    

    return (
        <>
        <PersonalAreaLayout>
        {product !== null && <div className='card-container'>
                <div className='card__info-wrapper'>
                    <div className='card__info__header'>
                        <div className='card__info__header-arrow' onClick={()=>navigate(-1)}><SvgSelector id='go-back-icon'/></div>
                        <div className='card__info__header__label-wrapper'>
                            <div className='card__info__header__label-number'>#{product.publicId}</div>
                            <div className='card__info__header__label-status'>{product.resultStatus.name !== 'COMPLETED' ? 'In progress' : 'Completed'}</div>
                        </div>
                        <div className='card__info__header-date'>{getDate(product.createdAt)}</div>
                    </div>
                    <div className='card__info__content'>
                        <div className='card__info__content-label'>
                            Authentication summary
                        </div>
                        <div className='card__info__content-wrapper'>
                            <div className='card__info__content-brand'>{product.brand.publicName}&nbsp;<div className="normal">authentication</div></div>
                            <div className='card__info__content__photos-wrapper'>
                                <div className='card__info__content__photos-label'>Uploaded images</div>
                                <div className='card__info__content__photos__images'>
                                    {product.files.map((el,index)=><div key={index} className='card__info__content__photos__images-elem' style={{ background: `url(${getPhotoUrl(el)})`}}></div>)}
                                    </div> 
                            </div>
                            <div className='card__info__content__elems-wrapper'>
                            <div className='card__info__content__elem-wrapper'>
                                <div className='card__info__content__elem-label'>Status</div>
                                <div className='card__info__content__elem-value'>{product.resultStatus.publicName}</div>
                            </div>
                            <div className='card__info__content__elem-wrapper'>
                                <div className='card__info__content__elem-label'>Outcome</div>
                                <div className='card__info__content__elem-value'>{product.checkStatus ? product.checkStatus : 'N/A'}</div>
                            </div>
                            <div className='card__info__content__elem-wrapper'>
                                <div className='card__info__content__elem-label'>Reason</div>
                                <div className='card__info__content__elem-value'>{getReasons(product.reasons)}</div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                    {product.certificateAvailable ? <div className='card__info__content__button certificate'>View certificate</div>
                    : <div className='card__info__content__button'>Request help</div>}
                </div>
                <div className='card__details-wrapper'></div>
            </div>}
        </PersonalAreaLayout>
        </>
    )
}

export default Card