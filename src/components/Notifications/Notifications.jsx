import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardNotif } from './CardNotif';
import { getNotification } from '../../api/notifications/notifications-api';
import './Notif.scss';
import { takeProducts } from '../../redux/selectors/product-selectors';

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const product = useSelector(takeProducts);

  const getNotifs = async () => {
    try {
      const response = await getNotification();
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifs();
  }, []);

  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [product]);

  return (
    <div className="notif-container">
      <div className="notif-messages">
        {notifications.notifications?.map((notification, index) => (
          <CardNotif key={index} product={product} item={notification} />
        ))}
      </div>
    </div>
  );
};
