import React from "react";
import "../../styles/ui/Footer.scss";

const Footer = (props) => {
  return (
    <div className="rectangle">
      <div className="infos-event">
        <div className="date">
          <div className="date-title">Date</div>
          <div className="date-real"></div>
        </div>
        <div className="time">
          <div className="time-title">Time</div>
          <div className="time-real"></div>
        </div>
        <div className="location">
          <div className="location-title">Location</div>
          <div className="location-real"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
