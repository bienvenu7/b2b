import "./AuthenticationRequest.scss";
import React, { useEffect } from "react";
import Select from "react-select";
import logo from "../../common/images/logo-for-mobile.png";
import SvgSelector from "../../common/icons/SvgSelector";
import AuthBalance from "../Payment/AuthBalance/AuthBalance";
import Balance from "../Balance/Balance";
import { useDispatch, useSelector } from "react-redux";
import { getTypesOfProduct } from "../../redux/selectors/product-selectors";
import { useState } from "react";
import {
  createOrderThunk,
  createProductThunk,
  getProductTypePropThunk,
  uploadPhotoForProductThunk,
} from "../../redux/thunks/authRequest-thunk";
import {
  takeBrands,
  takeOrder,
  takeAngles,
  takeBalance,
} from "../../redux/selectors/authRequest-selectors";
import Navigation from "../Navigation/Navigation";
import DropdownIndicator from "../../common/react-select/DropdownIndicator";
import MobileHeader from "../Mobile/MobileHeader/MobileHeader";
import {
  getPostErrors,
  getStatusCode,
} from "../../redux/selectors/app-selectors";
import { useNavigate } from "react-router-dom";
import { setStatusCode } from "../../redux/reducers/app-reducer";
import { setErrors } from "../../redux/reducers/app-reducer";
import Loader from "../Loader/Loader";
import { updateHoursPackage } from "../../redux/reducers/payment-reducer";
import { getPriceThunk } from "../../redux/thunks/payment-thunk";
import Dashboard from "../PersonalArea/Dashboard/Dashboard";
import Header from "../Header/Header";
import PersonalAreaLayout from "../PersonalArea/PersonalAreaLayout";

const AuthenticationRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productTypes = useSelector(getTypesOfProduct);
  const brands = useSelector(takeBrands);
  const order = useSelector(takeOrder);
  const angles = useSelector(takeAngles);
  const postErrors = useSelector(getPostErrors);

  const [productEditNumber, setProductEditNumber] = useState(0);

  const [certCheck, setCertCheck] = useState(false);

  const [buttonState, setButtonState] = useState(true);

  const [modelTypeValue, setModelTypeValue] = useState("");
  const [supplierTypeValue, setSupplierTypeValue] = useState("");
  const [answerTime, setAnswerTime] = useState(24);
  const [productTypeValue, setProductTypeValue] = useState(null);
  const [brandValue, setBrandValue] = useState();
  const [errorMessage, setErrorMessage] = useState("")
  const [brandSelectorKey, setBrandSelectorKey] = useState(0);
  const status = useSelector(getStatusCode);
  const [errors, setErrorsForForm] = useState({
    category: null,
    brand: null,
    typeModel: null,
  });

  //errors

  const [photoError, setPhotoError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [photoFiles, setPhotoFiles] = useState([]);
  // const [options, setOptions] = useState([])

  const options = [];

  const optionsBrands = [];

  const handleChangeCategory = (e) => {
    dispatch(getProductTypePropThunk(e.value));
    setProductTypeValue(e.type);
    setSelectedCategory(e.key);
    setPhotoFiles([]);
    setBrandSelectorKey(brandSelectorKey + 1);
    errors.category && setErrorsForForm({ ...errors, category: null });
    postErrors.authrequest && dispatch(setErrors(null));
  };

  function handleChangeBrand(e) {
    setBrandValue(e.brand);
    setSelectedBrand(e.key);
    errors.brand && setErrorsForForm({ ...errors, brand: null });
  }

  function handleChangeModelType(e) {
    setModelTypeValue(e.target.value);
    errors.typeModel && setErrorsForForm({ ...errors, typeModel: null });
  }

  useEffect(() => {
    setPhotoFiles(
      angles.map(
        (el, index) =>
          photoFiles.length == 0 && {
            key: index,
            file: "",
            imagePreviewUrl: "",
            angleId: el.angle.id,
            necessity: el.necessity,
            error: false,
            angleName: el.angle.publicName,
            format: null,
          }
      )
    );
  }, [angles]);

  const balance = useSelector(takeBalance);
  // productTypes.map((el, index) => options.push({ key: index, value: el.id, type: el, label: el.publicName }))
  brands.length > 0 &&
    brands[0].brand &&
    brands.map((el, index) =>
      optionsBrands.push({
        key: index,
        value: el.brand.id,
        brand: el.brand,
        label: el.brand.publicName,
      })
    );

  const forOption = [
    ...new Map(balance.map((item) => [item.productType.id, item])).values(),
  ];
  forOption.map((el, index) => {
    productTypes.map(
      (item) =>
        el.productType.id === item.id &&
        options.push({
          key: index,
          value: item.id,
          type: item,
          label: item.publicName,
        })
    ); //el.productType.publicName !== 'Certificate' && el.productType.publicName }))
  });

  function checkNecessity() {
    setPhotoFiles(
      photoFiles.map((el, index) =>
        el.necessity == 1 && el.file !== ""
          ? { ...el, error: false }
          : { ...el, error: true }
      )
    );
    !photoFiles.find((el) => el.error === true) && setPhotoError(false);
  }

  const handlePost = async () => {
    console.log("data", {
      order,
      productType: productTypeValue,
      brand: brandValue,
      modelName: modelTypeValue,
      supplier: supplierTypeValue,
      certificateNeeded: certCheck,
      answerTime: answerTime,
    });
    setButtonState(false);
    let onlineOrder = {};
    if (!brandValue) {
      !productTypeValue
        ? setErrorsForForm({
            ...errors,
            category: "Please select",
            brand: "Please select",
          })
        : setErrorsForForm({ ...errors, brand: "Please select" });
    }
    if (modelTypeValue == "") {
      if (!brandValue) {
        !productTypeValue
          ? setErrorsForForm({
              ...errors,
              category: "Please select",
              brand: "Please select",
              typeModel: "Please fill",
            })
          : setErrorsForForm({
              ...errors,
              brand: "Please select",
              typeModel: "Please fill",
            });
      } else {
        setErrorsForForm({ ...errors, typeModel: "Please fill" });
      }
      setButtonState(true);
      return;
    } else {
      if (!brandValue) {
        setButtonState(true);
        return;
      }
    }
    if (photoFiles.find((el) => el.file == "" && el.necessity == 1)) {
      const reqBlank =  photoFiles.filter((el) => el.necessity == 1)
      const inputBlank = photoFiles.filter((el) => el.file == "" && el.necessity == 1)      
      setPhotoFiles(
        photoFiles.map((el, index) =>
          el.file == "" && el.necessity == 1 ? { ...el, error: true } : el
        )
      );
      setPhotoError(true);
      setButtonState(true);
      if(reqBlank.length === inputBlank.length) setErrorMessage("It seems you did not upload photos of your item, please upload them before submitting!")
      if(reqBlank.length > inputBlank.length) setErrorMessage("One or more of the required photos are missing, please make sure you upload them!")
      return;
    }
    if (!order) {
      const response = await dispatch(createOrderThunk());
      onlineOrder = response;
    }
    const data = {
      order: !order ? onlineOrder : order,
      productType: productTypeValue,
      brand: brandValue,
      modelName: modelTypeValue,
      supplier: supplierTypeValue,
      certificateNeeded: certCheck,
      answerTime: answerTime,
    };
    const photosCount = photoFiles.filter((el) => el.file !== "").length;

    const response = await dispatch(createProductThunk(data));
    const response1 =
      response !== true
        ? await photoFiles
            .filter((el) => el.file !== "")
            .map(
              (el, index) =>
                el.file !== "" &&
                dispatch(
                  uploadPhotoForProductThunk(
                    {
                      productId: response.data.id,
                      file: el.file,
                      angleId: el.angleId,
                    },
                    photosCount,
                    index
                  )
                )
            )
        : setButtonState(true);
    response1 && setButtonState(true);
    if (status) {
      setAnswerTime(24);
      setModelTypeValue("");
      setSupplierTypeValue("");
      setCertCheck(false);
      setProductTypeValue(null);
      setProductEditNumber(productEditNumber + 1);
    }
  };

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
    reader.readAsDataURL(file);
    checkNecessity();
  }

  if (status == 201) {
    navigate("../success-order");
    dispatch(setStatusCode(null));
  }

  if (!buttonState) {
    return <Loader />;
  }

  return (
    <>
      <MobileHeader label="Authentication request" />
      <div className="auth_request__wrapper">
        <div className="auth_request__nav">
          <div className="auth_request__nav-bar">
            <Navigation
              hrefs={[
                { label: "Luxury store" },
                { label: "New authentification" },
              ]}
            />
            <div className="auth_request__nav-label">
              Authentification request
            </div>
          </div>
          <div className="auth_request__nav-bell">
            <SvgSelector id="bell" />
          </div>
        </div>
        {/* <Header /> */}
        <div className="auth_request__container">
          <div className="auth_request__logo">
            <img src={logo} className="auth_request__logo-image" />
          </div>
          <div className="auth_request__form">
            <div className="auth_request__form-wrapper">
              <div className="auth_request__form-container first">
                <div className="auth_request__form-container-wrapper first">
                  <div className="auth_request__form-heading">
                    Authentification request
                  </div>
                  <div className="auth_request__form__elem">
                    <div className="auth_request__form__elem-label">
                      Choose the category
                      <div className="btn">
                        {/*<button className={({answerTime}) => answerTime==12 ? 'active' : ''} onClick={()=>setAnswerTime(12)}>12 hours</button>
                                                <button className={({answerTime}) => answerTime==24 ? 'active' : ''} onClick={()=>setAnswerTime(24)}>24 hours</button>*/}
                        <div className="auth_request__form-radio_btn">
                          <input
                            type="radio"
                            name="hours"
                            value="12"
                            id="12h"
                          />
                          <label
                            htmlFor="12h"
                            onClick={() => setAnswerTime(12)}
                          >
                            12 hours
                          </label>
                        </div>
                        <div className="auth_request__form-radio_btn">
                          <input
                            type="radio"
                            name="hours"
                            checked
                            value="24"
                            id="24h"
                          />
                          <label
                            htmlFor="24h"
                            onClick={() => setAnswerTime(24)}
                            value="24"
                          >
                            24 hours
                          </label>
                        </div>
                      </div>
                    </div>
                    <Select
                      key={productEditNumber}
                      components={{ DropdownIndicator }}
                      options={options}
                      classNamePrefix="custom-select"
                      placeholder="Please select the category"
                      onChange={handleChangeCategory}
                    />
                    {errors.category && (
                      <div className="auth_request__form__elem-error">
                        {errors.category}
                      </div>
                    )}
                  </div>
                  <div className="auth_request__form-elem">
                    <div className="auth_request__form__elem-label">
                      Choose the brand
                    </div>
                    <Select
                      key={brandSelectorKey}
                      components={{ DropdownIndicator }}
                      options={optionsBrands}
                      classNamePrefix="custom-select"
                      placeholder="Please select the brand"
                      onChange={handleChangeBrand}
                    />
                    {errors.brand && (
                      <div className="auth_request__form__elem-error">
                        {errors.brand}
                      </div>
                    )}
                  </div>
                  <div className="auth_request__form__elem">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      id="certificate"
                      name="certificate"
                      checked={certCheck}
                      onChange={() => setCertCheck(!certCheck)}
                    />
                    <label htmlFor="certificate" id="forCert">
                      Include certificate
                    </label>
                  </div>
                  {certCheck && (
                    <div className="auth_request__form__elem">
                      <div className="auth_request__form__radio-group">
                        <div className="auth_request__form__radio-button">
                          Upload logo
                        </div>
                        <div className="auth_request__form__radio-button">
                          Use existing one
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="auth_request__form__elem">
                    <div className="auth_request__form__elem-label">
                      Additional details
                    </div>
                    <div className="auth_request__form__elem-input-wrapper">
                      <input
                        className="auth_request__form__elem-input"
                        placeholder="Type model name here"
                        value={modelTypeValue}
                        onChange={handleChangeModelType}
                      />
                      {errors.typeModel && (
                        <div className="auth_request__form__elem-error">
                          {errors.typeModel}
                        </div>
                      )}
                      <input
                        className="auth_request__form__elem-input"
                        placeholder="Type supplier name here (optional)"
                        value={supplierTypeValue}
                        onChange={(e) => setSupplierTypeValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="auth_request__form-container-wrapper second">
                  {/* <AuthBalance mt={0} /> */}
                  <Balance />
                </div>
              </div>
              <div className="auth_request__form-container second">
                <div
                  className="auth_request__form__elem-label"
                  id="photo_block_label"
                >
                  Upload photos
                </div>
                {photoError && (
                  <div className="auth_request__form-desc">
                    {errorMessage}
                  </div>
                )}

                <div className="auth_request__form__photo-container">
                  {productTypeValue &&
                    photoFiles.map((el, index) => (
                      <div
                        key={index}
                        className={`auth_request__form__photo-elem ${index}`}
                      >
                        {el.imagePreviewUrl !== "" ? (
                          <label
                            htmlFor={`photo-${index}`}
                            className="auth_request__form__photo-previewImg"
                            style={{ background: `url(${el.imagePreviewUrl})` }}
                          >
                            <input
                              className={`auth_request__form__photo-fileInput ${index}`}
                              accept=".png,.jpg,.jpeg"
                              type="file"
                              onChange={handleImageChange}
                              id={`photo-${index}`}
                            />
                          </label>
                        ) : (
                          <label
                            htmlFor={`photo-${index}`}
                            className={
                              el.necessity == 1
                                ? "auth_request__form__photo-photolabel required"
                                : "auth_request__form__photo-photolabel"
                            }
                          >
                            <input
                              className={`auth_request__form__photo-fileInput ${index}`}
                              accept=".png,.jpg,.jpeg"
                              type="file"
                              onChange={handleImageChange}
                              id={`photo-${index}`}
                            />
                          </label>
                        )}
                        <div className="auth_request__form__photo-name">
                          {el.angleName}
                        </div>
                        {el.format !== null && el.format !== true && (
                          <div className="auth_request__form__photo-error">
                            Format is not available
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="auth_request__form__footer">
              {postErrors.authrequest && (
                <div className="auth_request__form__footer-error">
                  {postErrors.authrequest}
                </div>
              )}
              <div className="auth_request__form__footer-wrapper">
                <div className="auth_request__form__footer__info">
                  <div className="auth_request__form__footer__info__h1">
                    Authentication summary
                  </div>
                  <div className="auth_request__form__footer__info__h2">
                    <div className="auth_request__form__footer__info__h2-label">
                      Authentication requests
                    </div>
                    <div className="auth_request__form__footer__info__h2-value">
                      1
                    </div>
                  </div>
                  <div className="auth_request__form__footer__info__h2">
                    <div className="auth_request__form__footer__info__h2-label">
                      Answer time
                    </div>
                    <div className="auth_request__form__footer__info__h2-value">
                      {answerTime} hours
                    </div>
                  </div>
                </div>
                <div
                  className="auth_request__form__footer__button-wrapper"
                  onClick={() => buttonState && handlePost()}
                >
                  <div
                    className={
                      buttonState
                        ? "auth_request__form__footer__button-elem"
                        : "auth_request__form__footer__button-elem disabled"
                    }
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AuthenticationRequest);
