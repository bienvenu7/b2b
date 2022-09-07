import React from "react";

import CardNotif from "./CardNotif";

import "./Notif.scss";

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
  return (
    <div className="notif-container">
      <div className="notif-messages">
        {notifs.map((notif, index) => (
          <CardNotif key={index} item={notif} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
