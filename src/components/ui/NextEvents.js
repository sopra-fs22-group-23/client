import React from "react";
import { useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../helpers/api";
import "../../styles/ui/NextEvents.scss";
import PropTypes from "prop-types";
import pic from "../pictures/badic.png";

const EventItemSquare = ({ event }) => (
  <div className="event-square">
    <img src={pic} className="upper" />
    <div className="lower">
      <div className="time-box">
        <p className="month">MAR</p>
        <p className="date">28</p>
      </div>
      <div>
        <p className="event-name">{event.title}</p>
        <p className="infos">
          {event.eventDate} · {event.locationName}
        </p>
      </div>
    </div>
  </div>
);

EventItemSquare.propTypes = {
  event: PropTypes.object,
};

const NextEvents = () => {
  const [events, setEvents] = useState(null);
  let content = <div></div>;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get("/events");

        setEvents(response.data);
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

  if (events) {
    //sort events
    let sortedEvents = [...events];
    sortedEvents.sort(function (a, b) {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });
    sortedEvents = sortedEvents.slice(0, 2);

    content = (
      <div className="row">
        <div className="col-6">
          <EventItemSquare event={sortedEvents[0]} />
        </div>
        <div className="col-6">
          <EventItemSquare event={sortedEvents[1]} />
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};
export default NextEvents;
