import React, { useState } from "react";

import CardNotif from "./CardNotif";

import { getNotification } from "../../api/notifications/notifications-api";

import { getProductThunk } from "../../redux/thunks/product-thunk";

import "./Notif.scss";
import { useEffect } from "react";
import { takeProducts } from "../../redux/selectors/product-selectors";
import { useSelector } from "react-redux";
import { getProduct } from "../../api/product/product-api";


const Notification = () => {

  const [notifications, setNotifications] = useState([])

  const product = useSelector(takeProducts);

  // console.log(product)

  useEffect(() => {
    getNotifs()
  }, [])

  useEffect(() => {}, [product])

  const getNotifs = async () => {
    try {
      const response = await getNotification()
      setNotifications(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="notif-container">
      {/* {console.log(notifications)} */}
      <div className="notif-messages">
        {notifications.notifications?.map((notification, index) => (
          <CardNotif key={index} product={product} item={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
