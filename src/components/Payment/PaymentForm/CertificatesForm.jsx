import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../../redux/selectors/auth-selectors';
import {
  getCategoryError,
  getCosts,
  getPrice,
  getUserCertificatePackage,
  getUserTariffPackages,
} from '../../../redux/selectors/payment-selectors';
import { DropdownIndicator } from '../../../common/react-select/DropdownIndicator';
import {
  pushTotal,
  removePreviewPackage,
  setCategoryError,
  setCertificate,
  setTotalPackage,
} from '../../../redux/reducers/payment-reducer';

export const CertificatesForm = ({ but, cartTotal }) => {
  const [volume, setVolume] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const userTariffPackages = useSelector(getUserTariffPackages);
  const categoryError = useSelector(getCategoryError);
  const cost = useSelector(getPrice);
  const costs = useSelector(getCosts);
  const certificate = useSelector(getUserCertificatePackage);
  const [, setInitial] = useState({ volume: null, userId: null });
  const [selectedValue, setSelectedValue] = useState(3);

  const handleChange = (event = selectedValue) => {
    const value = typeof event === 'object' ? event.value : selectedValue;

    setSelectedValue(value);
    let data = {
      userTariffPackages: [],
      userCertificatePackage: null,
    };
    if (value === 'include') {
      const countPackages = userTariffPackages
        ? userTariffPackages.reduce((prev, curr) => {
            return prev + curr.volume;
          }, 0)
        : 0;
      data = {
        userTariffPackages,
        userCertificatePackage: {
          volume: countPackages,
          userId,
        },
      };
      setInitial({ volume: 1, userId });
      dispatch(setCertificate(data.userCertificatePackage));
      cartTotal(data);
    } else if (value === 'notneeded') {
      data.userTariffPackages = userTariffPackages;
      setInitial({ volume: null, userId: null });
      dispatch(setCertificate(data.userCertificatePackage));
      cartTotal(data);
    } else if (value === 'choose') {
      data.userCertificatePackage = {
        volume,
        userId,
      };
      const totalData =
        userTariffPackages &&
        userTariffPackages.length === 1 &&
        (userTariffPackages[0].productType === '' || userTariffPackages[0].answerTime === '')
          ? data
          : { ...data, userTariffPackages };
      dispatch(setCertificate(data.userCertificatePackage));
      cartTotal(totalData);
      setInitial({ volume, userId });
    }
  };

  useEffect(() => {
    const data = {
      userCertificatePackage: certificate,
    };
    cartTotal(data);
  }, [certificate]);

  useEffect(() => {
    handleChange();
  }, [userTariffPackages]);

  const options = [
    { value: 'notneeded', label: 'Not needed' },
    { value: 'include', label: 'Include for each item' },
    { value: 'choose', label: 'Choose other amount' },
  ];

  selectedValue === 'choose' && categoryError != null && dispatch(setCategoryError(null));

  const handleChangeForNumeric = (e) => {
    setVolume(e);
    const data = {
      userTariffPackages,
      userCertificatePackage: {
        volume: e,
        userId,
      },
    };
    dispatch(setCertificate(data.userCertificatePackage));
    const totalData =
      userTariffPackages &&
      userTariffPackages.length === 1 &&
      (userTariffPackages[0].productType === '' || userTariffPackages[0].answerTime === '')
        ? data
        : { ...data, userTariffPackages };
    cartTotal(totalData);
  };

  const handlePost = () => {
    let vol = volume;
    if (userTariffPackages.length !== costs.length && selectedValue !== '') {
      dispatch(pushTotal(cost.package));
    }
    const lastPack = userTariffPackages[userTariffPackages.length - 1];
    if (lastPack.productType === '' && lastPack.answerTime === '') {
      dispatch(removePreviewPackage(userTariffPackages.length - 1));
    }
    const data = {};
    if (selectedValue === 'include') {
      vol = 0;
      userTariffPackages.map((e) => (vol += e.volume));
      data.userCertificatePackage = {
        userId,
        volume: vol,
        isGift: false,
      };
    } else if (selectedValue === 'choose') {
      data.userCertificatePackage = {
        userId,
        volume: vol,
        isGift: false,
      };
    }
    if (selectedValue === 'include' && userTariffPackages.length === 0) {
      dispatch(setCategoryError('Please choose the category'));
      return;
    }

    if (selectedValue !== '') {
      if (lastPack.productType !== '') {
        dispatch(setTotalPackage({ ...data, userTariffPackages }));
        navigate('../payment-first');
      } else {
        dispatch(setTotalPackage(data));
        navigate('../payment-first');
      }
    }

    setSelectedValue('');
    setVolume(1);
  };

  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [but]);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ props }) => (
        <Form className="payment__form" onChange={handleChange} {...props}>
          <div className="payment__form-block-container second">
            <label htmlFor="certificates" className="payment__form-label">
              Authenticity Certificates
            </label>
            <div className="payment__form-elems-wrapper">
              <div>
                <Select
                  components={{ DropdownIndicator }}
                  classNamePrefix="custom-select"
                  placeholder="Please select option"
                  options={options}
                  onChange={handleChange}
                />
              </div>
              {selectedValue === 'choose' && (
                <div className="payment__form-elem number-wrapper" id="cert_count">
                  <NumericInput
                    onChange={handleChangeForNumeric}
                    className="payment__form-elem number"
                    id="volume"
                    name="volume"
                    min={1}
                    value={volume}
                  />
                  <div className="payment__form-elem info">${cost.certificate / 100}&nbsp;per certificate</div>
                  <div className="payment__form-elem info">${(cost.certificate / 100) * volume}&nbsp; total</div>
                </div>
              )}
              <div className="payment__form-elem number-wrapper" />
            </div>
            <div className="payment__form-elem upload">
              <div className="payment__form-elem upload-btn">Upload logo</div>
              <div className="payment__form-elem upload-info">It will be added to the certificates</div>
            </div>
          </div>
          {but && handlePost(props)}
        </Form>
      )}
    </Formik>
  );
};
