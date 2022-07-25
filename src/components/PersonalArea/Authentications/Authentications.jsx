import PersonalAreaLayout from "../PersonalAreaLayout"
import SvgSelector from "../../../common/icons/SvgSelector"
import './Authentications.scss'

const Authentications = (props) => {
    return(
        <>
        <PersonalAreaLayout>
        <div className='authent-container'>
            <div className='authent__buttons-wrapper'>
                <div className='authent__buttons-elem selected'>Completed</div>
                <div className='authent__buttons-elem'>In progress</div>
            </div>
            <div className='authent-wrapper'>
                <div className='authent__nav-wrapper'>
                    <div className='authent__nav-label'>Completed authentications</div>
                    <input className='authent__nav-search' placeholder='Search'/>
                    <div className='authent__nav__buttons-wrapper'>
                        <div className='authent__nav__buttons__elem-wrapper'><SvgSelector id='filter-icon'/>Filter</div>
                        <div className='authent__nav__buttons__elem-wrapper'><SvgSelector id='download-icon'/>Download</div>
                    </div>
                </div>
            </div>
        </div>
        </PersonalAreaLayout>
        </>
    )
}

export default Authentications