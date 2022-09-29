import React, { useState } from 'react'

import './Order.scss'

import logo from '../../common/images/601.svg'
import { getAlbum } from '../../api/album-photo/album'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {takeAnglesList} from "../../redux/selectors/product-selectors";

const upload = [1, 2, 3, 4, 5, 6, 7, 8]

const Order = () => {

    const [album, setAlbum] = useState([])
    const [added, setAdded] = useState([])
    const [uploaded, setUploaded] = useState([])

    const params = useParams()

    console.log(params)

    useEffect(() => {
        getAlbumPhotos()
    }, [])

    const anglesList = useSelector(takeAnglesList);
    useEffect(()=>{
        console.log({anglesList})
    },[anglesList]);

    const getAnglePublicName = (id) => {
        if(!anglesList || !id)
            return '';
        console.log({id,anglesList})
        return anglesList.find(item=>item.id==id).publicName
    }


    const getAlbumPhotos = async () => {
        try {
            const response = await getAlbum(params.id)
            setAlbum(response.data)
            setUploaded(response.data.photos.filter(i => i.isAdditional === false))
            setAdded(response.data.photos.filter(i => i.isAdditional === true))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='order__full-container'>
            <div className="order__container">
                <div className="order__image">
                    <img src={logo} alt="legitgrails" />
                </div>
                <div className="order__header">
                    <h1>Authentication #{album.orderNumber}</h1>
                    <div className="order__header-details">
                        <h3>Item category</h3>
                        <span>{album.itemCategory}</span>
                        <h3>Brand</h3>
                        <span>{album.brand}</span>
                    </div>
                </div>
                {uploaded.length >= 1 && <div className='order__text'>Uploaded Images</div>}
                {uploaded.length >= 1 &&   <div className="order__upload">
                    {uploaded?.map((i, index) => (
                        <div className='auth_request__form__photo-container'>
                            <div key={index} className='auth_request__form__photo-elem'>
                                <div className='auth_request__form__photo-photolabel required'>
                                    <a href={i.path} target={'_blank'}><img className='album-image' src={i.path} alt="" /></a>
                                </div>
                                <div className='auth_request__form__photo-name'>{getAnglePublicName(i.angleId)}</div>
                            </div>
                        </div>
                    ))}
                </div>}
                {added.length >= 1 && <div className='order__text second'>Added Images</div>}
                {added.length >= 1 && <div className="order__upload second">
                    {added?.map(i => (
                        <div className='auth_request__form__photo-container'>
                            <div key={i} className={`auth_request__form__photo-elem ${i}`}>
                                <div className={'auth_request__form__photo-photolabel required'}>
                                    <a href={i.path} target={'_blank'}><img className='album-image' src={i.path} alt="" /></a>
                                </div>
                                <div className='auth_request__form__photo-name'>{getAnglePublicName(i.angleId)}</div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default Order