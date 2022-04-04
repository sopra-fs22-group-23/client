import React from "react";
import "../../styles/ui/EventItem.scss";
import pic from "../pictures/pizza.jpeg";

const EventItem = () => {
  return (
    <div className="event-item">
      <img src={pic} className="img" />
      <div className="info">
        <p className="event-name">Pizza Party</p>
        <p className="event-information">Tue 30 March 19:00 · Schlieren, ZH</p>
      </div>
    </div>
  );
};
export default EventItem;
