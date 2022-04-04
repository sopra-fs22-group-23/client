import React from "react";
import "../../styles/ui/Footer.scss";

const Footer = () => {
  return (
    <div className="rectangle">
      <div className="infos-event">
        <div className="date">
          <div className="date-title">Date</div>
          <div className="date-real">29 March 2022</div>
        </div>
        <div className="time">
          <div className="time-title">Time</div>
          <div className="time-real">20:15</div>
        </div>
        <div className="location">
          <div className="location-title">Location</div>
          <div className="location-real">Binzmühlestrasse 14, Zürich</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
