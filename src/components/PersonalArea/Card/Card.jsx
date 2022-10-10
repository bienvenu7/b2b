import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { setProduct } from '../../../redux/reducers/product-reducer';
import { takeAnglesList, takeProduct } from '../../../redux/selectors/product-selectors';
import { getProductThunk, updateProductThunk } from '../../../redux/thunks/product-thunk';
import { Loader } from '../../Loader/Loader';
import { PersonalAreaLayout } from '../PersonalAreaLayout';
import { UploadPhotoModal } from '../UploadPhotoModal/UploadPhotoModal';
import './Card.scss';

export const Card = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const product = useSelector(takeProduct);

  console.log(product)

  const anglesList = useSelector(takeAnglesList);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log(params)
    dispatch(getProductThunk(params.id));
    return () => {
      dispatch(setProduct(null));
    };
  }, []);

  const [width, height] = useWindowSize();

  function getPhotoUrl(file) {
    return file.path;
  }

  function getDate(str, version) {
    const date = new Date(str);
    if (version === "desktop") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      let month = date.getMonth();
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime =
        months[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear() +
        " at " +
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      return strTime;
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

  function getReasons(reasons) {
    if (reasons !== null && anglesList !== null) {
      const arr = reasons
        .split(",")
        .map((el) => anglesList.find((elem) => elem.clickupId === el));
      const total = arr.map((el, index) =>
        el !== undefined
          ? arr.length == index + 1
            ? el.publicName
            : el.publicName + ", "
          : null
      );
      return total;
    }
    return "N/A";
  }

  //for modal
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(el) {
    setIsOpen(true);
  }
  //

  //edit
  const [modelValue, setModelValue] = useState(product && product.modelName);
  const [supplierValue, setSupplierValue] = useState("");

  function onEditClick() {
    setEditMode(!editMode);
    editMode &&
      dispatch(
        updateProductThunk(product.id, {
          modelName: modelValue,
          supplier: supplierValue,
        })
      );
  }
  //

  function getCertificateLink(element) {
    console.log({element:element});
    // let dates = product.files.map(el => el.createdAt)
    // console.log({productdates1:dates});
    // dates.sort(function(a,b){
    //   return new Date(a) - new Date(b);
    // });
    // console.log({productdates2:dates});
    const file = element.files.find((el) => el.feature === "certificate");
    console.log({element:file});
    // if (process.env.NODE_ENV !== "production") {
      // return "/app/files";
    // } else {
      return file.path;
    // }
  }

  function goBack() {
    if (location.state && location.state.var !== "photo-requests") {
      navigate(
        `../authentications/${
          location.state.var === "progress" ? "in-progress" : "completed"
        }`,
        { state: { page: location.state.page, var: location.state.var } }
      );
    } else {
      navigate(`../photo-requests/all`, {
        state: {
          page: location.state && location.state.page,
          var: location.state && location.state.var,
        },
      });
    }
  }

  return (
    <>
      {isOpen && (
        <UploadPhotoModal
          isOpen={isOpen}
          closeModal={closeModal}
          elem={product}
        />
      )}
      {product !== null ? (
        <div className="top">
        <PersonalAreaLayout>
          {product !== null && (
            <div className="card-container">
              <div className="card__info-wrapper">
                <div className="card__info__header">
                  <div className="card__info__header-arrow" onClick={goBack}>
                    <SvgSelector id="go-back-icon" />
                  </div>
                  <div className="card__info__header__label-wrapper">
                    <div className="card__info__header__label-number">
                      #{product.publicId}
                    </div>
                    <div className="card__info__header__label-status">
                      {product.resultStatus.name !== "COMPLETED"
                        ? "In progress"
                        : "Completed"}
                    </div>
                  </div>
                  <div className="card__info__header-date">
                    {getDate(product.createdAt, "desktop")}
                  </div>
                  <div className="card__info__header-date mobile">
                    {getDate(product.createdAt, "mobile")}
                  </div>
                  <div className="card__info__header__bottom-wrapper">
                    {product &&
                    product.resultStatus.name === "UPDATE_NEEDED" ? (
                      <div className="card__info__header-statuses">
                        {product.resultStatus.publicName}
                      </div>
                    ) : (
                      product.resultStatus.name === "COMPLETED" && (
                        <>
                          <div className="card__info__header-statuses grey">
                            {product.resultStatus.publicName}
                          </div>
                          <div className="card__info__header-statuses">
                            {product.checkStatus}
                          </div>
                        </>
                      )
                    )}
                  </div>
                </div>
                <div className="card__info__content">
                  <div className="card__info__content-label">
                    authentication summary
                  </div>
                  <div className="card__info__content-wrapper">
                    <div className="card__info__content-brand">
                      {width > 599
                        ? product.brand.publicName
                        : product.productType.publicName}
                      &nbsp;<div className="normal">authentication</div>
                    </div>
                    <div className="card__info__content__photos-wrapper">
                      <div className="card__info__content__photos-label">
                        Uploaded images{" "}
                        {product.resultStatus.name === "UPDATE_NEEDED" && (
                          <div className="button" onClick={openModal}>
                            Add photos
                          </div>
                        )}
                      </div>
                      <div className="card__info__content__photos__images">
                        {(product.files.length < 1
                          ? [1, 2, 3, 4]
                          : product.files
                        ).map((el, index) => (
                          <div
                            key={index}
                            className="card__info__content__photos__images-elem"
                            style={{ background: `url(${getPhotoUrl(el)})` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="card__info__content__elems-wrapper">
                      <div className="card__info__content__elem-wrapper brand">
                        <div className="card__info__content__elem-label">
                          Brand
                        </div>
                        <div className={`card__info__content__elem-value`}>
                          {product.brand.publicName}
                        </div>
                      </div>
                      <div className="card__info__content__elem-wrapper">
                        <div className="card__info__content__elem-label">
                          Status
                        </div>
                        <div
                          className={`card__info__content__elem-value${
                            product.resultStatus.name === "UPDATE_NEEDED" &&
                            " red"
                          }`}
                        >
                          {product.resultStatus.publicName}
                        </div>
                      </div>
                      <div
                        className={`card__info__content__elem-wrapper${
                          product.resultStatus.name !== "COMPLETED"
                            ? " none"
                            : ""
                        }`}
                      >
                        <div className="card__info__content__elem-label">
                          Outcome
                        </div>
                        <div className="card__info__content__elem-value">
                          {product.checkStatus ? product.checkStatus : "N/A"}
                        </div>
                      </div>
                      <div className="card__info__content__elem-wrapper">
                        <div className="card__info__content__elem-label">
                          Reason
                        </div>
                        <div className="card__info__content__elem-value">
                          {getReasons(product.reasons)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mybtn">
                  {product.certificateAvailable ? (
                    <a className="card__info__content__button certificate" href={getCertificateLink(product)}>
                      View certificate
                    </a>
                  ) : (
                    <div className="card__info__content__button certificate">
                      Get a certificate
                    </div>
                  )}
                </div>
              </div>
              <div className="card__details-wrapper">
                <div className="card__details__header">
                  <div className="card__details__header-label">
                    Additional details
                  </div>
                  <div
                    className="card__details__header-button"
                    onClick={onEditClick}
                  >
                    Edit
                  </div>
                </div>
                <div className="card__details__content-wrapper">
                  <div className="card__details__content__elem-wrapper">
                    <div className="card__details__content__elem-label">
                      Model name
                    </div>
                    {!editMode ? (
                      <div className="card__details__content__elem-value">
                        {product.modelName}
                      </div>
                    ) : (
                      <input
                        className="card__details__content__elem-input"
                        dir={width > 599 && `rtl`}
                        type="text"
                        value={modelValue}
                        onChange={(e) => setModelValue(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="card__details__content__elem-wrapper">
                    <div className="card__details__content__elem-label">
                      Supplier
                    </div>
                    {!editMode ? (
                      <div className="card__details__content__elem-value">
                        {product.supplier === "" ? "—" : product.supplier}
                      </div>
                    ) : (
                      <input
                        className="card__details__content__elem-input"
                        dir={width > 599 && `rtl`}
                        type="text"
                        value={supplierValue}
                        onChange={(e) => setSupplierValue(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {product.resultStatus.name === "UPDATE_NEEDED" && (
                <div className="card__warning-wrapper">
                  <div className="card__warning-label">
                    Additional photos are needed
                  </div>
                  <div className="card__warning-message">
                    Please upload the following photos to complete the
                    authentication: inside stitching, size label
                  </div>
                  <div className="card__warning-button" onClick={openModal}>
                    Add photos
                  </div>
                </div>
              )}
            </div>
          )}
        </PersonalAreaLayout>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
