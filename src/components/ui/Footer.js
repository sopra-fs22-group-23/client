import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";

const Footer = (props) => {

  let content = <div></div>;

    content = (
      <div className="rectangle">
        <div className="infos-event">
          <div className="date">
            <div className="date-title">Date</div>
            <div className="date-real">{props.event.eventDate}</div>
          </div>
          <div className="time">
            <div className="time-title">Time</div>
            <div className="time-real">{props.event.eventDate}</div>
          </div>
          <div className="location">
            <div className="location-title">Location</div>
            <div className="location-real">{props.event.locationName}</div>
          </div>
        </div>
      </div>
    );
  return <>{content}</>;
};

export default Footer;
