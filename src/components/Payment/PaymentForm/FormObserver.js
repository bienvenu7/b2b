import React, { useState } from "react";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/reducers/payment-reducer";

const FormObserver = (props) => { 
    const dispatch = useDispatch()
    const { values, submitForm } = useFormikContext()

    const [data, setData] = useState()

    useEffect(() => {
      const value = {...values, volume: props.volume};
       console.log(value)
    }, [values, props.volume]);
    return null; 
  };

  export default FormObserver