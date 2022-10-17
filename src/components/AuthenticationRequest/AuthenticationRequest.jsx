import './AuthenticationRequest.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypesOfProduct } from '../../redux/selectors/product-selectors';
import {
  createOrderThunk,
  createProductThunk,
  getProductTypePropThunk,
  uploadPhotoForProductThunk,
} from '../../redux/thunks/authRequest-thunk';
import { takeAngles, takeBalance, takeBrands, takeOrder } from '../../redux/selectors/authRequest-selectors';
import { getPostErrors, getStatusCode } from '../../redux/selectors/app-selectors';
import { setErrors, setStatusCode } from '../../redux/reducers/app-reducer';
import { Loader } from '../Loader/Loader';
import { AuthenticationRequestLayout } from './AuthenticationRequestLayout';

export const AuthenticationRequest = () => {
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
  });
  const [, setPhotoError] = useState(false);
  const [, setSelectedCategory] = useState('');
  const [, setSelectedBrand] = useState('');
  const [photoFiles, setPhotoFiles] = useState([]);
  const options = [];
  const optionsBrands = [];

  const valid = () => {
    for (const key in errors) {
      if (errors[key] == null) {
        setCheckValid(false);
        break;
      }
      setCheckValid(true);
    }
  };

  useEffect(() => {
    valid();
  }, [checkValid, errors]);

  const handleChangeCategory = useCallback(
    (e) => {
      dispatch(getProductTypePropThunk(e.value));
      setProductTypeValue(e.type);
      setSelectedCategory(e.key);
      setPhotoFiles([]);
      setBrandSelectorKey(brandSelectorKey + 1);
      setErrorsForm({ ...errors, category: true });
      postErrors.authrequest && dispatch(setErrors(null));
      valid();
    },
    [errors, checkValid],
  );

  const handleChangeBrand = useCallback(
    (e) => {
      setBrandValue(e.brand);
      setSelectedBrand(e.key);
      setErrorsForm({ ...errors, brand: true });
      valid();
    },
    [errors, checkValid],
  );

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

  console.log(brands)

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
        ? photoFiles // пробегаюсь по массиву
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

  const deleteImage = useCallback((index) => {
    setPhotoFiles(
      photoFiles.map((item) => (item.key === index ? { ...item, file: '', imagePreviewUrl: '', format: false } : item)),
    );
  }, []);

  const handleImageChange = useCallback((e) => {
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
  }, []);

  if (status === 201) {
    navigate('../success-order');
    dispatch(setStatusCode(null));
  }

  if (!buttonState) {
    return <Loader />;
  }

  return (
    <AuthenticationRequestLayout
      setModelTypeValue={setModelTypeValue}
      checkValid={checkValid}
      postErrors={postErrors}
      answerTime={answerTime}
      photoFiles={photoFiles}
      deleteImage={deleteImage}
      handleImageChange={handleImageChange}
      supplierTypeValue={supplierTypeValue}
      setSupplierTypeValue={setSupplierTypeValue}
      productTypeValue={productTypeValue}
      modelTypeValue={modelTypeValue}
      setCertCheck={setCertCheck}
      certCheck={certCheck}
      handleChangeBrand={handleChangeBrand}
      optionsBrands={optionsBrands}
      brandSelectorKey={brandSelectorKey}
      errors={errors}
      setAnswerTime={setAnswerTime}
      handleChangeCategory={handleChangeCategory}
      options={options}
      productEditNumber={productEditNumber}
      handlePost={handlePost}
    />
  );
};
