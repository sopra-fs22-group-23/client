import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";

const Footer = (props) => {
  const [event, setEvent] = useState(null);
  let { id } = useParams();
  let content = <div></div>;
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn.get(`/events/${id}`);

        setEvent(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for detailss."
        );
      }
    }

    fetchData();
  }, []);

  if (event) {
    content = (
      <div className="rectangle">
        <div className="infos-event">
          <div className="date">
            <div className="date-title">Date</div>
            <div className="date-real">{event.eventDate}</div>
          </div>
          <div className="time">
            <div className="time-title">Time</div>
            <div className="time-real">{event.eventDate}</div>
          </div>
          <div className="location">
            <div className="location-title">Location</div>
            <div className="location-real">{event.locationName}</div>
          </div>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default Footer;
