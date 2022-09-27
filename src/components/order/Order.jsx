import React, { useState, useEffect } from 'react'
import { getProduct } from '../../api/product/product-api'

import './Order.scss'

import logo from '../../common/images/601.svg'

const upload = [1, 2, 3, 4, 5, 6, 7]

const Order = () => {

    const [photoFiles, setPhotoFiles] = useState([]);

    const [authentication, setAuthentication] = useState({
      publicId: 0,
      modelName: 0,
      supplier: 0,
      hashPhoto: 0,
    });

    useEffect(() => {
      getProduct().then((r) => {
        authentication(r.data)
      })
    }, []);

    console.log(getProduct('3d3f6893-62dd-4e62-9414-2793027ce6f4'), 'id DATA') 

    function handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        let index = e.target.id.split("-")[1];
    
        if (
          !file.name.match(/\.(gif|jpg|jpeg|png|heic|heif|JPG|JPEG|PNG|HEIC|HEIF)$/)
        ) {
          setPhotoFiles(
            photoFiles.map((item) =>
              item.key == index ? { ...item, format: false } : item
            )
          );
          return;
        }
        reader.onloadend = () => {
          setPhotoFiles(
            photoFiles.map((item) =>
              item.key == index
                ? {
                    ...item,
                    file: file,
                    imagePreviewUrl: reader.result,
                    error: false,
                    format: true,
                  }
                : item
            )
          );
        };
        reader.readAsDataя(file);
        // checkNecessity();
        // valid()
      }

  return (
    <div className='order__full-container'>
        <div className="order__container">
            <div className="order__image">
                <img src={logo} alt="legitgrails" />
            </div>
            <div className="order__header">
                <h1>Authentication #[order number]</h1>
                <div className="order__header-details">
                    <h3>Item category</h3>
                    <span>Luxury shoes</span>
                    <h3>Brand</h3>
                    <span>Louis Vuitton</span>
                </div>
            </div>
            <div className='order__text'>Uploaded Images</div>
            <div className="order__upload">
                {upload.map(i => (
                    <div className='auth_request__form__photo-container'>
                        <div key={i} className={`auth_request__form__photo-elem ${i}`}>
                            <label className={'auth_request__form__photo-photolabel required'}>
                                <input className={`auth_request__form__photo-fileInput ${i}`} accept=".png,.jpg,.jpeg" type="file" onChange={handleImageChange}/>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className='order__text second'>Added Images</div>
            <div className="order__upload second">
                {upload.map(i => (
                    <div className='auth_request__form__photo-container'>
                        <div key={i} className={`auth_request__form__photo-elem ${i}`}>
                            <label className={'auth_request__form__photo-photolabel required'}>
                                <input className={`auth_request__form__photo-fileInput ${i}`} accept=".png,.jpg,.jpeg" type="file"/>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Order