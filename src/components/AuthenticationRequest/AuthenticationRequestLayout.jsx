import React from 'react';
import Select from 'react-select';
import { Header } from '../Header/Header';
import logo from '../../common/images/logo-for-mobile.png';
import { PersonalAreaLayout } from '../PersonalArea/PersonalAreaLayout';
import { DropdownIndicator } from '../../common/react-select/DropdownIndicator';
import { Balance } from '../Balance/Balance';
import './AuthenticationRequest.scss';

export const AuthenticationRequestLayout = React.memo(
  ({
    postErrors,
    answerTime,
    photoFiles,
    deleteImage,
    handleImageChange,
    supplierTypeValue,
    setSupplierTypeValue,
    productTypeValue,
    modelTypeValue,
    setCertCheck,
    certCheck,
    handleChangeBrand,
    optionsBrands,
    brandSelectorKey,
    errors,
    setAnswerTime,
    handleChangeCategory,
    options,
    productEditNumber,
    handlePost,
    checkValid,
    setModelTypeValue,
  }) => {
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
                        onChange={(e) => setModelTypeValue(e.target.value)}
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
              {postErrors.authrequest && (
                <div className="auth_request__form__footer-error">{postErrors.authrequest}</div>
              )}
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
  },
);
