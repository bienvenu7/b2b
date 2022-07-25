import PersonalAreaLayout from "../PersonalAreaLayout"
import './PhotoRequests.scss'
import temp from '../../../common/images/logo-of-store.png'

const PhotoRequests = (props) => {

    //temp

    const arr = [
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
        {image: temp, publicName: 'Luxury shoes', number: '#123435', brand: 'Hermes', date: '22/03/2022', photos: 'Inside stitching, insole (backside)'},
    ]


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
                            {arr.map((el,index)=> 
                            <div key={index} className="photo_requests__table__elem">
                                <div className="photo_requests__table__elem__category">
                                    <div className="photo_requests__table__elem__category-image">
                                        <img src={el.image} alt="" />
                                    </div>
                                    <div className="photo_requests__table__elem__category-label">{el.publicName}</div>
                                    <div className="photo_requests__table__elem__category-number">{el.number}</div>
                                </div>
                                <div className="photo_requests__table__elem-brand">{el.brand}</div>
                                <div className="photo_requests__table__elem-date">{el.date}</div>
                                <div className="photo_requests__table__elem-required">{el.photos}</div>
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