import React, { useState } from 'react'

import './Order.scss'

import logo from '../../common/images/601.svg'
import { getAlbum } from '../../api/album-photo/album'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

    


    console.log(album)
    console.log(uploaded)
    console.log(added)

    // const [photoFiles, setPhotoFiles] = useState([]);

    // function handleImageChange(e) {
    //     e.preventDefault();
    
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    
    //     let index = e.target.id.split("-")[1];
    
    //     if (
    //       !file.name.match(/\.(gif|jpg|jpeg|png|heic|heif|JPG|JPEG|PNG|HEIC|HEIF)$/)
    //     ) {
    //       setPhotoFiles(
    //         photoFiles.map((item) =>
    //           item.key == index ? { ...item, format: false } : item
    //         )
    //       );
    //       return;
    //     }
    //     reader.onloadend = () => {
    //       setPhotoFiles(
    //         photoFiles.map((item) =>
    //           item.key == index
    //             ? {
    //                 ...item,
    //                 file: file,
    //                 imagePreviewUrl: reader.result,
    //                 error: false,
    //                 format: true,
    //               }
    //             : item
    //         )
    //       );
    //     };
    //     reader.readAsDataURL(file);
    //     // checkNecessity();
    //     // valid()
    //   }

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
                                <img className='album-image' src={i.path} alt="" />
                            </div>
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
                                {/* <input className={`auth_request__form__photo-fileInput ${i}`} accept=".png,.jpg,.jpeg" type="file"/> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    </div>
  )
}

export default Order