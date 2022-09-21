import PersonalAreaLayout from "../PersonalAreaLayout";
import "./PhotoRequests.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  takeAnglesList,
  takeProducts,
  takeResultStatuses,
} from "../../../redux/selectors/product-selectors";
import { getProductsThunk } from "../../../redux/thunks/product-thunk";
import { useNavigate, useParams } from "react-router-dom";
import UploadPhotoModal from "../UploadPhotoModal/UploadPhotoModal";

const PhotoRequests = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(takeProducts);
  const resultStatuses = useSelector(takeResultStatuses);
  const anglesList = useSelector(takeAnglesList);

  useEffect(() => {
    const filter = {
      resultStatuses:
        resultStatuses !== null &&
        resultStatuses.filter((el) => el.name === "UPDATE_NEEDED"),
    };
    resultStatuses !== null &&
      products === null &&
      dispatch(getProductsThunk(filter));
  });

  function getReasons(reasons, version) {
    if (version === "desktop") {
      if (reasons !== null && anglesList !== null) {
        const arr = reasons
          .split(",")
          .map((el) => anglesList.find((elem) => elem.clickupId === el));
        const total =
          arr.length >= 2
            ? arr.map((el, index) =>
                el !== undefined
                  ? index < 1
                    ? el.publicName 
                    : index === 1
                    ? ` and ${arr.length - 1} more`
                    : ""
                  : null
              )
            : arr.map((el, index) =>
                el !== undefined
                  ? arr.length == index + 1
                    ? el.publicName
                    : el.publicName + ", "
                  : null
              );
        return total;
      }
    } else if (version === "mobile") {
      const total =
        reasons !== null &&
        anglesList !== null &&
        reasons
          .split(",")
          .map((el) => anglesList.find((elem) => elem.clickupId === el))
          .map((el) => el.publicName);
      return total;
    }
  }

  function getPhotoUrl(files) {
      if(typeof files != 'object' )
          return '';
      return files[0].path
  }

  const [isOpen, setIsOpen] = useState(false);
  const [elem, setElem] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(el) {
    setIsOpen(true);
    setElem(el);
  }

  function getDate(data, version) {
    const date = new Date(data);
    if (version === "desktop") {
      return (
        date.getDate() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getYear()
      );
    } else if (version === "mobile") {
      return (
        date.getHours() +
        ":" +
        date.getMinutes() +
        "·" +
        date.getDate() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getYear()
      );
    }
  }

    return (
        <>
            {isOpen && <UploadPhotoModal isOpen={isOpen} closeModal={closeModal} elem={elem}/>}
            <div className="top">
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
                            {products !== null && products.map((el, index) =>
                                <div key={index} className="photo_requests__table__elem">
                                    {console.log(el.files)}
                                    <div className="photo_requests__table__elem__category" onClick={() => navigate(`../request/${el.id}`)}>
                                        <div className="photo_requests__table__elem__category-image" style={{ background: `url(${getPhotoUrl(el.files)})` }}></div>
                                        <div className="photo_requests__table__elem__category-button" onClick={()=>openModal(el)}>Upload photos</div>
                                        <div className="photo_requests__table__elem__category-label">{el.productType.publicName}</div>
                                        <div className="photo_requests__table__elem__category-number">#{el.publicId}</div>
                                        <div className="photo_requests__table__elem__category-date">{getDate(el.createdAt, 'mobile')}</div>
                                    </div>
                                    <div className="photo_requests__table__elem-brand">{el.brand.publicName}</div>
                                    <div className="photo_requests__table__elem-date">{getDate(el.createdAt, 'desktop')}</div>
                                    <div className="photo_requests__table__elem-required">{getReasons(el.reasons,'desktop')}</div>
                                    <div className="photo_requests__table__elem-required__mobile">{getReasons() && getReasons(el.reasons,'mobile').map((el,index)=>
                                    <div key={index} className="photo_requests__table__elem-required__mobile-elem">{el}</div>)}</div>
                                    <div className="photo_requests__table__elem-button" onClick={()=>openModal(el)}>Upload</div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </PersonalAreaLayout>
            </div>
        </>
    )
}

export default PhotoRequests;
