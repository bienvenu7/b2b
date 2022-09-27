import React, { useEffect } from "react";
import { useState } from "react";
import { getProduct } from "../../api/product/product-api";

import "./Notif.scss";

const CardNotif = ({ item, product }) => {

  const [prod, setProd] = useState(null)




  useEffect(() => {
    getOneProduct()
  }, [item])
  
  const getOneProduct = async () => {
    try {
      const response = await getProduct(item.productId)
      setProd(response.data)
    } catch (error) {
      
    }
  }

  // const newArray = product.filter((p) => p.id === item.productId)

  // console.log(newArray)
  // console.log(prod)

  return (
    <div className="card-content">
      {/* {console.log(item)} */}
      <div className="card-title">{item.title}</div>
      <div className="card-text">{item.text}</div>
      {prod?.reasons !== null & prod?.systemStatus === 'AWAIT_PHOTOS' ? <button className="card-btn">Add more photos</button> : ''}
    </div>
  );
};

export default CardNotif;
