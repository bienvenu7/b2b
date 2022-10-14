import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  initPackage,
  pushTotal,
  setCategoryError,
  updateHoursPackage,
  updateTypePackage,
  updateVolumePackage,
} from '../../../redux/reducers/payment-reducer';
import { getUserId } from '../../../redux/selectors/auth-selectors';
import { getTypesOfProduct } from '../../../redux/selectors/product-selectors';
import { DropdownIndicator } from '../../../common/react-select/DropdownIndicator';
import { getPriceThunk } from '../../../redux/thunks/payment-thunk';
import {
  getCategoryError,
  getCosts,
  getUserCertificatePackage,
  getUserTariffPackages,
  getPrice,
} from '../../../redux/selectors/payment-selectors';

export const CategoryForm = React.memo(({ but, getPrice:getPriceProps, cartTotal }) => {
  const [volume, setVolume] = useState(1);
  const [errorsForAnswerTime, setErrorForAnswerTime] = useState(null);
  const [packageEditNumber, setPackageEdit] = useState(0);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const productTypes = useSelector(getTypesOfProduct);
  const certificatePackage = useSelector(getUserCertificatePackage);
  const cart = useSelector(getUserTariffPackages);
  const categoryError = useSelector(getCategoryError);
  const cost = useSelector(getPrice);
  const [answerTime, setAnswerTime] = useState(24);
  const [productType, setProductType] = useState(null);
  const [productTypeVar, setProductTypeVar] = useState(null);
  const [options, setOptions] = useState([]);
  const costsArrey = useSelector(getCosts);
  const packages = useSelector(getUserTariffPackages);

  const specialNames = ['SNEAKERS_HYPE', 'SNEAKERS_LUXURY', 'OTHER_SHOES_HYPE', 'OTHER_SHOES_LUXURY'];

  useEffect(() => {
    const list = productTypes
      .filter((item) => {
        return specialNames.indexOf(item.name) === -1;
      })
      .map((item) => {
        return {
          value: {
            name: item.name,
            types: { single: item },
          },
          label: item.publicName,
        };
      });
    list.push({
      value: {
        name: 'hypeShoes',
        types: {
          sneakers: productTypes.find((item) => item.name === 'SNEAKERS_HYPE'),
          other: productTypes.find((item) => item.name === 'OTHER_SHOES_HYPE'),
        },
      },
      label: 'Hype shoes',
    });
    list.push({
      value: {
        name: 'luxuryShoes',
        types: {
          sneakers: productTypes.find((item) => item.name === 'SNEAKERS_LUXURY'),
          other: productTypes.find((item) => item.name === 'OTHER_SHOES_LUXURY'),
        },
      },
      label: 'Luxury shoes',
    });
    setOptions(list);
  }, [productTypes]);

  const [selectedValue, setSelectedValue] = useState('');

  const updateType = (e, typeOfShoes) => {
    setProductTypeVar(typeOfShoes);
    if (e != null) {
      let type = e !== 3 && e.types.single;
      if (e.name === 'hypeShoes') {
        typeOfShoes === 'sneakers' ? (type = e.types.sneakers) : (type = e.types.other);
      } else if (e.name === 'luxuryShoes') {
        typeOfShoes === 'sneakers' ? (type = e.types.sneakers) : (type = e.types.other);
      }
      e.value !== 3 && dispatch(updateTypePackage({ index: packageEditNumber, type }));
      setProductType(type);
      const data = {
        productType: type,
        volume,
        answerTime,
      };
      dispatch(getPriceThunk(data));
    }
  };

  const handleChange = (e, formik) => {
    const checked = packages.findIndex(
      (item) => e.label === item.productType.publicName || item.productType.publicName === 'Sneakers: Hype',
    );

    if (checked < 0) {
      setSelectedValue(e.value);
      dispatch(setCategoryError(null));
      updateType(e.value, formik);
    } else {
      dispatch(
        updateVolumePackage({
          index: checked,
          volume: packages[checked].volume + 1,
        }),
      );

      const data = {
        productType: packages[checked].productType,
        volume: packages[checked].volume,
        answerTime: packages[checked].answerTime,
      };
      dispatch(getPriceThunk(data));
    }
  };

  const handleChangeForNumeric = (e) => {
    const temppackage = {
      package: cost.package,
      cart: cart.length,
      costsArrey: costsArrey.length,
    };
    dispatch(pushTotal(temppackage)); // костыль
    setVolume(e);
    dispatch(updateVolumePackage({ index: packageEditNumber, volume: e }));
    const data = {
      productType,
      volume: e,
      answerTime,
    };
    getPriceProps(data);
  };

  const updateHours = (value, data) => {
    const pack = {
      productType,
      volume,
      answerTime: value,
    };
    setAnswerTime(value);
    dispatch(updateHoursPackage({ index: packageEditNumber, hours: value }));
    dispatch(getPriceThunk(pack));
    cartTotal(data);
    setErrorForAnswerTime(null);
  };

  cart.length < 1 && dispatch(initPackage(userId));

  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [but]);

  useEffect(() => {
    dispatch(updateHoursPackage({ index: packageEditNumber, hours: 24 }));
  }, [packageEditNumber, dispatch]);

  useEffect(() => {
    const data = {
      userTariffPackages: cart,
    };
    cartTotal(data);
  }, [cart]);

  function handleClose() {
    setProductType(null);
    setSelectedValue('');
    setProductTypeVar(null);
    setVolume(1);
    setAnswerTime(24);
  }

  const handlePost = (formik) => {
    if (formik.values.hours !== '0') {
      setPackageEdit(packageEditNumber + 1);
      dispatch(initPackage(userId));
      dispatch(pushTotal(cost.package));
      setVolume(1);
    }
    formik.values.hours = '0';
    handleClose();
  };

  return (
    <Formik
      initialValues={{
        hours: answerTime.toString(),
        typeOfShoes: '',
        getUserCertificatePackage: certificatePackage,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(values);
          resetForm();
          setSubmitting(false);
        }, 1000);
      }}
    >
      {(props2) => (
        <Form className="payment__form" onSubmit={but && props2.handleSubmit}>
          <div className="payment__form-block-container first">
            <label htmlFor="category" className="payment__form-label">
              Choose the category
            </label>
            <Select
              key={packageEditNumber}
              components={{ DropdownIndicator }}
              classNamePrefix="custom-select"
              placeholder="Please select the category"
              options={productTypes.length > 0 ? options : []}
              value={options[selectedValue]}
              onChange={(e) => handleChange(e, props2.values.typeOfShoes)}
            />

            {['hypeShoes', 'luxuryShoes'].indexOf(selectedValue.name) !== -1 && (
              <div className="payment__form-elem shoes-vars">
                <label htmlFor="types" className="payment__form-label">
                  Choose the shoes type
                </label>

                <div className="payment__form-radio_btn_types-container">
                  <div className="payment__form-radio_btn_types" id="types">
                    <Field
                      type="radio"
                      name="typeOfShoes"
                      checked={productTypeVar === 'sneakers'}
                      value="sneakers"
                      id="sneakers"
                      className="custom-radio"
                      onChange={(e) => {
                        updateType(selectedValue, e.target.value);
                      }}
                    />
                    <label htmlFor="sneakers">Sneakers</label>
                  </div>
                  <div className="payment__form-radio_btn_types">
                    <Field
                      type="radio"
                      name="typeOfShoes"
                      checked={productTypeVar === 'other'}
                      value="other"
                      id="other"
                      className="custom-radio"
                      onChange={(e) => {
                        updateType(selectedValue, e.target.value);
                      }}
                    />
                    <label htmlFor="other" id="otherlabel">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            )}
            {categoryError != null && <div className="payment__form-error">{categoryError}</div>}
            <div className="payment__form-second_block-wrapper">
              <div className="payment__form-elem__hours-wrapper">
                <label htmlFor="hours" className="payment__form-label">
                  Choose answer time
                </label>
                <div className="payment__form-elem hours">
                  <div className="payment__form-radio_btn">
                    <Field type="radio" name="hours" value="2" id="2h" />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-noninteractive-element-interactions */}
                    <label
                      htmlFor="2h"
                      onClick={() =>
                        updateHours(2, {
                          userTariffPackages: cart,
                          userCertificatePackage: certificatePackage,
                        })
                      }
                    >
                      2 hours
                    </label>
                  </div>
                  <div className="payment__form-radio_btn">
                    <Field type="radio" name="hours" value="12" id="12h" />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-noninteractive-element-interactions */}
                    <label
                      htmlFor="12h"
                      onClick={() =>
                        updateHours(12, {
                          userTariffPackages: cart,
                          userCertificatePackage: certificatePackage,
                        })
                      }
                    >
                      12 hours
                    </label>
                  </div>
                  <div className="payment__form-radio_btn">
                    <Field type="radio" name="hours" value="24" id="24h" />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-noninteractive-element-interactions */}
                    <label
                      htmlFor="24h"
                      onClick={() =>
                        updateHours(24, {
                          userTariffPackages: cart,
                          userCertificatePackage: certificatePackage,
                        })
                      }
                      value="24"
                    >
                      24 hours
                    </label>
                  </div>
                  {errorsForAnswerTime != null && <div className="payment__form-errors">{errorsForAnswerTime}</div>}
                </div>
              </div>
              <div className="payment__form-elem__volume-wrapper">
                <label htmlFor="volume" className="payment__form-label">
                  Authentication volume
                </label>
                <div className="payment__form-elem number-wrapper">
                  <NumericInput
                    onChange={handleChangeForNumeric}
                    className="payment__form-elem number"
                    id="volume"
                    name="volume"
                    min={1}
                    value={volume}
                  />
                  {!cost != null && (
                    <div className="payment__form-elem info">${cost.package / 100}&nbsp;per authentication</div>
                  )}
                </div>
                <div className="payment__form-href">How does our pricing work?</div>
              </div>
            </div>
          </div>
          {but && handlePost(props2)}
        </Form>
      )}
    </Formik>
  );
});
