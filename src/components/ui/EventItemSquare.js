import React from "react";
import "../../styles/ui/EventItemSquare.scss";
import pic from "../pictures/badic.png";

const EventItemSquare = () => {
  return (
    <div className="event-square">
      <img src={pic} className="upper" />
      <div className="lower">
        <div className="time-box">
          <p className="month">MAR</p>
          <p className="date">28</p>
        </div>
        <div>
          <p className="event-name">Java course</p>
          <p className="infos">Wed 12:15 · Zürich</p>
        </div>
      </div>
    </div>
  );
};
export default EventItemSquare;
