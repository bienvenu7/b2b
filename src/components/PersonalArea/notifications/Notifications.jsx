import React, { useState } from "react";

import CardNotif from "./CardNotif";

import { getNotification } from "../../../api/notifications/notifications-api";

import "./Notif.scss";
import { useEffect } from "react";
import { takeProducts } from "../../../redux/selectors/product-selectors";
import { useSelector } from "react-redux";

const notifs = [
  {
    title: "#19920 more photos are needed",
    text: "Please add more photos for us to finalise the authentication!",
  },
  {
    title: "#19920 more photos are needed",
    text: "Please add more photos for us to finalise the authentication!",
  },
  {
    title: "#19920 more photos are needed",
    text: "Please add more photos for us to finalise the authentication!",
  },
  {
    title: "#19920 more photos are needed",
    text: "Please add more photos for us to finalise the authentication!",
  },
  {
    title: "#19920 more photos are needed",
    text: "Please add more photos for us to finalise the authentication!",
  },
];

const Notification = () => {

  const [notifications, setNotifications] = useState([])

  const product = useSelector(takeProducts);

  console.log(product)

  useEffect(() => {
    getNotifs()
  }, [])

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
