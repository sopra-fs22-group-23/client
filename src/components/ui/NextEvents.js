import React from "react";
import { useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../helpers/api";
import "../../styles/ui/NextEvents.scss";
import PropTypes from "prop-types";
import pic from "../pictures/badic.png";
import moment from "moment";
import { useNavigate } from "react-router";

const EventItemSquare = ({ event }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/event/${event.id}`;
    navigate(path);
  };

  return (
    <button className="event-square" onClick={routeChange}>
      <img src={pic} className="upper" />
      <div className="lower">
        <div className="time-box">
          <p className="month"> {moment(event.eventDate).format("MMM")} </p>
          <p className="date">{moment(event.eventDate).format("D")}</p>
        </div>
        <div>
          <p className="event-name">{event.title}</p>
          <p className="infos">
            {moment(event.eventDate).format("Do MMM")} · {event.locationName}
          </p>
        </div>
      </div>
    </button>
  );
};

EventItemSquare.propTypes = {
  event: PropTypes.object,
};

const NextEvents = () => {
  const [events, setEvents] = useState(null);
  let content = <div></div>;
  let now = moment().format();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get(
          `/events?type=PUBLIC&from=${now}`
        );

        setEvents(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the events! See the console for detailss."
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
    if (sortedEvents.length === 1) {
      sortedEvents = sortedEvents.slice(0, 1);
      content = (
        <div className="row">
          <div className="col-6">
            <EventItemSquare event={sortedEvents[0]} />
          </div>
        </div>
      );
    }
    if (sortedEvents.length > 1) {
      sortedEvents = sortedEvents.slice(0, 2);
      content = (
        <div className="squares">
          <EventItemSquare event={sortedEvents[0]} />
          <EventItemSquare event={sortedEvents[1]} />
        </div>
      );
    }
  }

  return (
    <div>
      <p>Upcoming public events:</p>
      {content}
    </div>
  );
};
export default NextEvents;
