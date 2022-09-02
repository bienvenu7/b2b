import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import * as NumericInput from "react-numeric-input";
import { useDispatch, useSelector } from "react-redux";
import {
  initPackage,
  pushTotal,
  setCategoryError,
  updateHoursPackage,
  updateTypePackage,
  updateVolumePackage,
} from "../../../redux/reducers/payment-reducer";
import { getUserId } from "../../../redux/selectors/auth-selectors";
import { getTypesOfProduct } from "../../../redux/selectors/product-selectors";
import Select from "react-select";
import DropdownIndicator from "../../../common/react-select/DropdownIndicator";
import { getPriceThunk } from "../../../redux/thunks/payment-thunk";
import {
  getCategoryError,
  getPrice,
  getUserTariffPackages,
} from "../../../redux/selectors/payment-selectors";
import SvgSelector from "../../../common/icons/SvgSelector";

const CategoryForm = (props) => {
  const [volume, setVolume] = useState(1);
  const [errorsForAnswerTime, setErrorForAnswerTime] = useState(null);
  const [packageEditNumber, setPackageEdit] = useState(0);

  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const productTypes = useSelector(getTypesOfProduct);
  const cart = useSelector(getUserTariffPackages);
  const categoryError = useSelector(getCategoryError);
  const cost = useSelector(getPrice);
  const [answerTime, setAnswerTime] = useState(24);
  const [productType, setProductType] = useState([]);
  const [productTypeVar, setProductTypeVar] = useState(null);
  const [checked, setChecked] = useState(true);

  //   const doubles = [
  //     {
  //       parent: "SNEAKERS_HYPE",
  //       childs: ["SNEAKERS_HYPE","OTHER_SHOES_HYPE"],
  //       publicName: "Hype shoes",
  //     },
  //     {
  //       parent: "SNEAKERS_LUXURY",
  //       childs: ["SNEAKERS_LUXURY","OTHER_SHOES_LUXURY"],
  //       publicName: "Luxury shoes",
  //     },
  //   ];

  //   const options2 = productTypes
  //     .filter((item, index) => {
  //       const doubleItem = doubles.find((item=>item.childs.indexOf(item.name))!=-1)
  //       doubleItem
  //     //   const doubleItem = doubles.find(
  //     //     (itemDoub) => itemDoub.name === item.name
  //     //   );
  //     //   console.log({ doubleItem, index });
  //     //   if (doubleItem && doubleItem.name != doubleItem.parent) return false;
  //       else return true;
  //     })
  //     .map((item, index) => {
  //       const doubleItem = doubles.find(
  //         (itemDoub) => itemDoub.name === item.name
  //       );
  //       const parentItem = productType.find(
  //         (itemProduct) => itemProduct.name == doubleItem.parent
  //       );
  //       const doubles = productType.filter
  //       return {
  //         value: {
  //           id: parentItem ? parentItem.id : item.id,
  //           doubles:
  //         },
  //         label: doubleItem ? doubleItem.publicName : item.publicName,
  //       };
  //     });
  //   console.log({ options });

  //   let single = {
  //     id: "ec10993d-8e1b-42a6-9e61-65a6e2c2e292",
  //     name: "SNEAKERS_HYPE",
  //     publicName: "Sneakers: Hype",
  //     __entity: "ProductType",
  //   };

  //   console.log({ productTypes });

  const options = [
    {
      value: { name: "bags", types: { single: productTypes[4] } },
      label: "Bags",
    },
    {
      value: { name: "wallets", types: { single: productTypes[5] } },
      label: "Wallets",
    },
    {
      value: {
        name: "hypeShoes",
        types: { sneakers: productTypes[0], other: productTypes[2] },
      },
      label: "Hype shoes",
    },
    {
      value: {
        name: "luxuryShoes",
        types: { sneakers: productTypes[1], other: productTypes[3] },
      },
      label: "Luxury shoes",
    },
    {
      value: { name: "jewellery", types: { single: productTypes[7] } },
      label: "Jewellery",
    },
    {
      value: { name: "watches", types: { single: productTypes[8] } },
      label: "Watches",
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e, formik) => {
    console.log("formik ", formik);
    setSelectedValue(e.value);
    dispatch(setCategoryError(null));
    updateType(e.value, formik, "handle formik");
  };

  const handleChangeForNumeric = (e) => {
    setVolume(e);
    dispatch(updateVolumePackage({ index: packageEditNumber, volume: e }));
    const data = {
      productType: productType,
      volume: e,
      answerTime: answerTime,
    };
    props.getPrice(data);
  };

  const changeRadioInputHours = (e) => {
    setAnswerTime(e.target.value);
  };

  const changeRadioInputType = (e) => {
    console.log(e);
    setProductTypeVar(e.target.value);
  };

  // const updateType = () => {
  //   if (selectedValue != null) {
  //     //   let type = selectedValue !== 3 && selectedValue.types.single;
  //     let type;
  //     if (selectedValue.name === "hypeShoes") {
  //       productTypeVar === "sneakers" // заменить на productTypeVar
  //         ? (type = selectedValue.types.sneakers) // e заменить на selectedValue
  //         : (type = selectedValue.types.other);
  //     } else if (selectedValue.name === "luxuryShoes") {
  //       productTypeVar === "sneakers"
  //         ? (type = selectedValue.types.sneakers)
  //         : (type = selectedValue.types.other);
  //     }
  //     selectedValue.value !== 3 &&
  //       dispatch(updateTypePackage({ index: packageEditNumber, type: type }));
  //     setProductType(type);

  //     const data = {
  //       productType: type,
  //       volume: volume,
  //       answerTime: answerTime,
  //     };
  //     dispatch(getPriceThunk(data));
  //   }
  // };

  const updateType = (e, typeOfShoes, fromWhere = "unknow") => {
    console.log({ fromWhere });
    console.log("typeOfShoes: ", typeOfShoes);
    console.log("e: ", e);
    setProductTypeVar(typeOfShoes);
    if (e != null) {
      let type = e !== 3 && e.types.single;
      console.log("результат непонятного условия: ", e !== 3 && e.types.single);
      console.log("type перед условиями = ", type);
      if (e.name === "hypeShoes") {
        console.log(fromWhere);
        typeOfShoes === "sneakers" || !typeOfShoes // заменить на productTypeVar
          ? (type = e.types.sneakers) // e заменить на selectedValue
          : (type = e.types.other);
      } else if (e.name === "luxuryShoes") {
        console.log(fromWhere);
        typeOfShoes === "sneakers" || !typeOfShoes
          ? (type = e.types.sneakers)
          : (type = e.types.other);
        console.log(type);
      }
      //   e.value !== 3 &&
      dispatch(updateTypePackage({ index: packageEditNumber, type: type }));

      setProductType(type);

      const data = {
        productType: type,
        volume: volume,
        answerTime: answerTime,
      };
      console.log(data);
      dispatch(getPriceThunk(data));
    }
  };

  //   console.log(
  //     "сравнение ",
  //     "ProductType: ",
  //     productType,
  //     "ProductTypeVar: ",
  //     productTypeVar
  //   );

  const updateHours = () => {
    console.log(answerTime, cart);
    const pack = {
      productType: productType,
      volume: volume,
      answerTime: answerTime,
    };
    dispatch(
      updateHoursPackage({ index: packageEditNumber, hours: answerTime })
    );
    dispatch(getPriceThunk(pack));
    props.cartTotal(cart);
    setErrorForAnswerTime(null);
  };

  cart.length < 1 && dispatch(initPackage(userId));

  useEffect(() => {
    updateHours();
  }, [answerTime]);

  //   useEffect(() => {
  //     updateType();
  //   }, [productTypeVar]);

  useEffect(() => {
    const data = {
      userTariffPackages: cart,
    };
    cart.length > 0 && props.cartTotal(data);
  }, [cart]);

  let but = props.but;

  const handlePost = (formik) => {
    if (formik.values.hours !== "0") {
      setPackageEdit(packageEditNumber + 1);
      dispatch(initPackage(userId));
      dispatch(pushTotal(cost.package));
      setVolume(1);
    }
    formik.values.hours = "0";
    handleClose();
  };

  function handleClose() {
    setProductType(null);
    setSelectedValue("");
    setProductTypeVar(null);
    setVolume(1);
  }

  return (
    <>
      <Formik
        initialValues={{ hours: "0", typeOfShoes: "" }}
        validate={(values) => {}}
        change={() => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {(props) => (
          <Form
            className="payment__form"
            onSubmit={props.handleSubmit}
            onChange={props.change}
          >
            <div className="payment__form-block-container first">
              {productType !== null && (
                <>
                  <div className="payment__form-current_package_state-wrapper">
                    <div onClick={handleClose}>
                      <SvgSelector id="xmark" />
                    </div>
                    <div className="payment__form-current_package_state">
                      <div className="payment__form-current_package_state-name">
                        {selectedValue && selectedValue.types.single
                          ? selectedValue.types.single.publicName
                          : productTypeVar
                          ? productTypeVar === "sneakers"
                            ? selectedValue.types.sneakers.publicName
                            : selectedValue.types.other.publicName
                          : ""}
                      </div>
                      <div className="payment__form-current_package_state-cost">
                        ${cost.package / 100}&nbsp;x&nbsp;{volume}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* <> */}
              <hr />
              {/* </>} */}
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
                onChange={(e) => handleChange(e, props.values.typeOfShoes)}
              />

              {(selectedValue.name === "hypeShoes" ||
                selectedValue.name === "luxuryShoes") && (
                <div className="payment__form-elem shoes-vars">
                  <label htmlFor="types" className="payment__form-label">
                    Choose the shoes type
                  </label>

                  <div className="payment__form-radio_btn_types-container">
                    <div className="payment__form-radio_btn_types" id="types">
                      <Field
                        type="radio"
                        name="typeOfShoes"
                        checked={
                          productTypeVar === "sneakers" // || !productTypeVar
                            ? true
                            : false
                        }
                        value="sneakers"
                        id="sneakers"
                        className="custom-radio"
                        onChange={(e) => {
                          updateType(
                            selectedValue,
                            e.target.value,
                            "radio change"
                          );
                        }}
                        // onClick={() => console.log(selectedValue)}
                        // onChange={changeRadioInputType}
                      />
                      <label htmlFor="sneakers">Sneakers</label>
                      {/*<div className="payment__form-radio_btn_types-label">Sneakers</div>*/}
                    </div>
                    <div className="payment__form-radio_btn_types">
                      <Field
                        type="radio"
                        name="typeOfShoes"
                        checked={productTypeVar === "other" ? true : false}
                        value="other"
                        id="other"
                        className="custom-radio"
                        onChange={(e) => {
                          updateType(
                            selectedValue,
                            e.target.value,
                            "radio change 2"
                          );
                        }}
                      />
                      <label htmlFor="other" id="otherlabel">
                        Other
                      </label>
                      {/*<label htmlFor="other" className="payment__form-radio_btn_types-label">Other</label>*/}
                    </div>
                  </div>
                </div>
              )}
              {categoryError != null && (
                <div className="payment__form-error">{categoryError}</div>
              )}
              <div className="payment__form-second_block-wrapper">
                <div className="payment__form-elem__hours-wrapper">
                  <label htmlFor="hours" className="payment__form-label">
                    Choose answer time
                  </label>
                  <div className="payment__form-elem hours">
                    <div className="payment__form-radio_btn">
                      <Field
                        type="radio"
                        name="hours"
                        value="12"
                        id="12h"
                        onClick={() => {
                          setChecked(!checked);
                        }}
                        onChange={changeRadioInputHours}
                        checked={!checked}
                      />
                      <label htmlFor="12h" value="12">
                        12 hours
                      </label>
                    </div>
                    <div className="payment__form-radio_btn">
                      <Field
                        type="radio"
                        name="hours"
                        value="24"
                        id="24h"
                        onClick={() => {
                          setChecked(!checked);
                        }}
                        onChange={changeRadioInputHours}
                        checked={checked}
                      />
                      <label htmlFor="24h" value="24">
                        24 hours
                      </label>
                    </div>
                    {errorsForAnswerTime != null && (
                      <div className="payment__form-errors">
                        {errorsForAnswerTime}
                      </div>
                    )}
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
                      <div className="payment__form-elem info">
                        ${cost.package / 100}&nbsp;per authentication
                      </div>
                    )}
                  </div>
                  <div className="payment__form-href" onClick={() => {}}>
                    How does our pricing work?
                  </div>
                </div>
              </div>
            </div>
            {but && handlePost(props)}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default React.memo(CategoryForm);
