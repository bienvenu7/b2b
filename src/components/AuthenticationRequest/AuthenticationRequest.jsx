import './AuthenticationRequest.scss';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../common/images/logo-for-mobile.png';
import { Balance } from '../Balance/Balance';
import { getTypesOfProduct } from '../../redux/selectors/product-selectors';
import {
  createOrderThunk,
  createProductThunk,
  getProductTypePropThunk,
  uploadPhotoForProductThunk,
} from '../../redux/thunks/authRequest-thunk';
import { takeAngles, takeBalance, takeBrands, takeOrder } from '../../redux/selectors/authRequest-selectors';
import { DropdownIndicator } from '../../common/react-select/DropdownIndicator';
import { getPostErrors, getStatusCode } from '../../redux/selectors/app-selectors';
import { setErrors, setStatusCode } from '../../redux/reducers/app-reducer';
import { Loader } from '../Loader/Loader';
import { Header } from '../Header/Header';
import { PersonalAreaLayout } from '../PersonalArea/PersonalAreaLayout';

export const AuthenticationRequest = React.memo(() => {
  // TODO
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
  const [modelTypeValue, setModelTypeValue] = useState('');
  const [supplierTypeValue, setSupplierTypeValue] = useState('');
  const [answerTime, setAnswerTime] = useState(24);
  const [productTypeValue, setProductTypeValue] = useState(null);
  const [brandValue, setBrandValue] = useState();
  const [, setErrorMessage] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const [brandSelectorKey, setBrandSelectorKey] = useState(0);
  const status = useSelector(getStatusCode);
  const [errors, setErrorsForm] = useState({
    category: null,
    brand: null,
    typeModel: null,
  });

  const [, setPhotoError] = useState(false);

  const [, setSelectedCategory] = useState('');
  const [, setSelectedBrand] = useState('');

  const [photoFiles, setPhotoFiles] = useState([]);

  const options = [];

  const optionsBrands = [];

  function valid() {
    for (const key in errors) {
      if (errors[key] == null) {
        setCheckValid(false);
        break;
      }
      setCheckValid(true);
    }
  }

  const handleChangeCategory = (e) => {
    dispatch(getProductTypePropThunk(e.value));
    setProductTypeValue(e.type);
    setSelectedCategory(e.key);
    setPhotoFiles([]);
    setBrandSelectorKey(brandSelectorKey + 1);
    setErrorsForm({ ...errors, category: true });
    postErrors.authrequest && dispatch(setErrors(null));
    valid();
  };

  function handleChangeBrand(e) {
    setBrandValue(e.brand);
    setSelectedBrand(e.key);
    setErrorsForm({ ...errors, brand: true });
    valid();
  }

  function handleChangeModelType(e) {
    setModelTypeValue(e.target.value);
    setErrorsForm({ ...errors, typeModel: true });
    valid();
  }

  useEffect(() => {
    setPhotoFiles(
      angles.map(
        (el, index) =>
          photoFiles.length === 0 && {
            key: index,
            file: '',
            imagePreviewUrl: '',
            angleId: el.angle.id,
            necessity: el.necessity,
            error: false,
            angleName: el.angle.publicName,
            format: null,
          },
      ),
    );
  }, [angles]);

  const balance = useSelector(takeBalance);
  brands.length > 0 &&
    brands[0].brand &&
    brands.map((el, index) =>
      optionsBrands.push({
        key: index,
        value: el.brand.id,
        brand: el.brand,
        label: el.brand.publicName,
      }),
    );

  const forOption = [...new Map(balance.map((item) => [item.productType.id, item])).values()];
  forOption.map((el, index) => {
    return productTypes.map(
      (item) =>
        el.productType.id === item.id &&
        options.push({
          key: index,
          value: item.id,
          type: item,
          label: item.publicName,
        }),
    );
  });

  function checkNecessity() {
    setPhotoFiles(
      photoFiles.map((el) => (el.necessity === 1 && el.file !== '' ? { ...el, error: false } : { ...el, error: true })),
    );
    !photoFiles.find((el) => el.error === true) && setPhotoError(false);
  }

  const handlePost = async () => {
    // TODO-переписать
    setButtonState(false); // кнопка  в состояние неактивной
    let onlineOrder = {}; // пустой объект, для чего?
    if (!brandValue) {
      // если brandValue - false
      !productTypeValue // дополнительно проверить productTypeValue - false
        ? setErrorsForm({
            // если productTypeValue - false
            ...errors,
            category: 'Please select',
            brand: 'Please select',
          })
        : setErrorsForm({ ...errors, brand: 'Please select' }); // иначе
    }

    if (modelTypeValue === '') {
      // дополнительно проверить modelTypeValue, что там пустая строка
      if (!brandValue) {
        // если brandValue - false
        !productTypeValue // дополнительно проверить productTypeValue - false
          ? setErrorsForm({
              // если productTypeValue - false
              ...errors,
              category: 'Please select',
              brand: 'Please select',
              typeModel: 'Please fill',
            })
          : setErrorsForm({
              // иначе
              ...errors,
              brand: 'Please select',
              typeModel: 'Please fill',
            });
      } else {
        // иначе если в productTypeValue - true
        setErrorsForm({ ...errors, typeModel: 'Please fill' });
      }
      setButtonState(true); // в любом случае выполнить
      return; // и выйти из функции
    }
    // иначе если modelTypeValue не пустая строка
    if (!brandValue) {
      // и brandValue - false
      setButtonState(true);
      return; // выйти из функции
    }

    //  блок, который определяет, поля с обязательными полями все пустые или частично
    if (photoFiles.find((el) => el.file === '' && el.necessity === 1)) {
      // если есть хоть один элемент в маассиве photoFilesБ который соотвествует условиям
      const reqBlank = photoFiles.filter((el) => el.necessity === 1); // получить все элементы el.necessity == 1
      // получить все элементы el.file == "" && el.necessity == 1
      const inputBlank = photoFiles.filter((el) => el.file === '' && el.necessity === 1);
      setPhotoFiles(photoFiles.map((el) => (el.file === '' && el.necessity === 1 ? { ...el, error: true } : el)));
      setPhotoError(true);
      setButtonState(true);
      if (reqBlank.length === inputBlank.length)
        setErrorMessage('It seems you did not upload photos of your item, please upload them before submitting!');
      if (reqBlank.length > inputBlank.length)
        setErrorMessage('One or more of the required photos are missing, please make sure you upload them!');
      return;
    }

    // если заказ пустой
    if (!order) {
      const response = await dispatch(createOrderThunk()); // создать этот заказ
      onlineOrder = response; // записать его в пустой объект, который создавался раннее
    }

    const data = {
      // исли через useSelect получен пустой объект, записать onlineOrder,
      // который возможно тоже пустой, иначе - запсиать данные из useSelect
      order: !order ? onlineOrder : order,
      productType: productTypeValue,
      brand: brandValue,
      modelName: modelTypeValue,
      supplier: supplierTypeValue,
      certificateNeeded: certCheck,
      answerTime,
    };
    // длинна photoFiles с загруженными фотографиями
    const photosCount = photoFiles.filter((el) => el.file !== '').length;

    const response = await dispatch(createProductThunk(data)); // отправляется заказ

    const response1 =
      response !== true // если ответ неудачный
        ? await photoFiles // пробегаюсь по массиву
            .filter((el) => el.file !== '') // фильтрую объекты, где в полях el.file !== "" - не пустые строки
            .map(
              // этот отфильрованный объект ...
              (el, index) =>
                el.file !== '' && // проверяю, что JS в предыдущей хуйне понял меня верно...
                dispatch(
                  // делаю диспатч и что-то записываю
                  uploadPhotoForProductThunk(
                    {
                      productId: response.data.id,
                      file: el.file,
                      angleId: el.angleId,
                      isAdditional: false,
                    },
                    photosCount,
                    index,
                  ),
                ),
            )
        : setButtonState(true); // иначе кнопка отправки в исходном состоянии
    // после всей хуйни проверю response1 === true и на всякий случай кнопку в исходное состояние
    response1 && setButtonState(true);

    if (status) {
      // проверяю статус кода какого-то запроса и выполняю следующие дейсвтия
      setAnswerTime(24);
      setModelTypeValue('');
      setSupplierTypeValue('');
      setCertCheck(false);
      setProductTypeValue(null);
      setProductEditNumber(productEditNumber + 1);
    }
  };

  const deleteImage = (index) => {
    setPhotoFiles(
      photoFiles.map((item) => (item.key === index ? { ...item, file: '', imagePreviewUrl: '', format: false } : item)),
    );
  };

  function handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    const index = e.target.id.split('-')[1];

    if (!file.name.match(/\.(gif|jpg|jpeg|png|heic|heif|JPG|JPEG|PNG|HEIC|HEIF)$/)) {
      setPhotoFiles(photoFiles.map((item) => (item.key === index ? { ...item, format: false } : item)));
      return;
    }
    reader.onloadend = () => {
      setPhotoFiles(
        photoFiles.map((item) =>
          item.key === index
            ? {
                ...item,
                file,
                imagePreviewUrl: reader.result,
                error: false,
                format: true,
              }
            : item,
        ),
      );
    };
    reader.readAsDataURL(file);
    checkNecessity();
  }

  if (status === 201) {
    navigate('../success-order');
    dispatch(setStatusCode(null));
  }

  if (!buttonState) {
    return <Loader />;
  }

  return (
    <div className="auth_request__wrapper">
      <div className="top">
        <Header />
      </div>
      <div className="top-mobile">
        <PersonalAreaLayout />
      </div>
      <div className="auth_request__container">
        <div className="auth_request__logo">
          <img src={logo} alt="" className="auth_request__logo-image" />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handlePost();
          }}
          className="auth_request__form"
        >
          <div className="auth_request__form-wrapper">
            <div className="auth_request__form-container first">
              <div className="auth_request__form-container-wrapper first">
                <div className="auth_request__form-heading">authentication request</div>
                <div className="auth_request__form__elem">
                  <div className="auth_request__form__elem-label">Choose the category</div>
                  <Select
                    key={productEditNumber}
                    components={{ DropdownIndicator }}
                    options={options}
                    classNamePrefix="custom-select"
                    placeholder="Please select the category"
                    onChange={handleChangeCategory}
                  />
                  <div className="btn">
                    <div className="auth_request__form-radio_btn">
                      <input type="radio" name="hours" value="2" id="2h" />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                      jsx-a11y/no-noninteractive-element-interactions */}
                      <label htmlFor="2h" onClick={() => setAnswerTime(2)}>
                        2 hours
                      </label>
                    </div>
                    <div className="auth_request__form-radio_btn">
                      <input type="radio" name="hours" value="12" id="12h" />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                      jsx-a11y/no-noninteractive-element-interactions */}
                      <label htmlFor="12h" onClick={() => setAnswerTime(12)}>
                        12 hours
                      </label>
                    </div>
                    <div className="auth_request__form-radio_btn">
                      <input type="radio" name="hours" value="24" id="24h" />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                      jsx-a11y/no-noninteractive-element-interactions */}
                      <label htmlFor="24h" onClick={() => setAnswerTime(24)} value="24">
                        24 hours
                      </label>
                    </div>
                  </div>
                  {errors.category && <div className="auth_request__form__elem-error">{errors.category}</div>}
                </div>
                <div className="auth_request__form-elem">
                  <div className="auth_request__form__elem-label">Choose the brand</div>
                  <Select
                    key={brandSelectorKey}
                    components={{ DropdownIndicator }}
                    options={optionsBrands}
                    classNamePrefix="custom-select"
                    placeholder="Please select the brand"
                    onChange={handleChangeBrand}
                  />
                  {errors.brand && <div className="auth_request__form__elem-error">{errors.brand}</div>}
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
                      <div className="auth_request__form__radio-button">Upload logo</div>
                      <div className="auth_request__form__radio-button">Use existing one</div>
                    </div>
                  </div>
                )}
                <div className="auth_request__form__elem">
                  <div className="auth_request__form__elem-label">Additional details</div>
                  <div className="auth_request__form__elem-input-wrapper">
                    <input
                      className="auth_request__form__elem-input"
                      placeholder="Type model name here"
                      value={modelTypeValue}
                      onChange={handleChangeModelType}
                    />
                    {errors.typeModel && <div className="auth_request__form__elem-error">{errors.typeModel}</div>}
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
                <Balance mt={0} />
              </div>
            </div>
            <div className="auth_request__form-container second">
              <div className="auth_request__form__elem-label" id="photo_block_label">
                Upload photos
              </div>
              {productTypeValue && (
                <div className="auth_request__form-desc">
                  Required fields are outlined, please fill them up if details are available
                </div>
              )}

              <div className="auth_request__form__photo-container">
                {productTypeValue &&
                  photoFiles.map((el, index) => (
                    <div key={index} className={`auth_request__form__photo-elem ${index}`}>
                      {el.imagePreviewUrl !== '' ? (
                        <>
                          <label
                            htmlFor={`photo-${index}`}
                            className="auth_request__form__photo-previewImg"
                            style={{
                              background: `url(${el.imagePreviewUrl})`,
                            }}
                          >
                            <input
                              className={`auth_request__form__photo-fileInput ${index}`}
                              accept=".png,.jpg,.jpeg"
                              type="file"
                              onChange={handleImageChange}
                              id={`photo-${index}`}
                            />
                          </label>
                          <button className="auth_request__form__photo-button" onClick={() => deleteImage(index)}>
                            Х
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor={`photo-${index}`}
                          className={
                            el.necessity === 1
                              ? 'auth_request__form__photo-photolabel required'
                              : 'auth_request__form__photo-photolabel'
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
                      <div className="auth_request__form__photo-name">{el.angleName}</div>
                      {el.format !== false && el.format !== null && el.format !== true && (
                        <div className="auth_request__form__photo-error">Format is not available</div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="auth_request__form__footer">
            {postErrors.authrequest && <div className="auth_request__form__footer-error">{postErrors.authrequest}</div>}
            <div className="auth_request__form__footer-wrapper">
              <div className="auth_request__form__footer__info">
                <div className="auth_request__form__footer__info__h1">Summary</div>
                <div className="auth_request__form__footer__info__h2">
                  <div className="auth_request__form__footer__info__h2-label">authentication requests</div>
                  <div className="auth_request__form__footer__info__h2-value">1</div>
                </div>
                <div className="auth_request__form__footer__info__h2">
                  <div className="auth_request__form__footer__info__h2-label">Answer time</div>
                  <div className="auth_request__form__footer__info__h2-value">{answerTime} hours</div>
                </div>
              </div>
              {checkValid && (
                <button className="auth_request__form__footer__button-wrapper" type="submit">
                  Submit
                </button>
              )}
              {!checkValid && (
                <button className="auth_request__form__footer__button-wrapper-disabled" type="submit" disabled>
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
