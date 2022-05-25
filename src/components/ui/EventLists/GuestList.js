import { useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
import "../../../styles/ui/EventItem.scss";
import pic from "../../pictures/pizza.jpeg";
import { useNavigate } from "react-router";
import moment from "moment";

const EventItem = ({ event }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/event/${event.id}`;
    navigate(path);
  };

  return (
    <button className="event-item" onClick={routeChange}>
      <img src={pic} className="img" />
      <div className="info">
        <p className="event-name">{event.title}</p>
        <p className="event-information location-field">
          {moment(event.eventDate).format("Do MMM")} · {event.locationName}
        </p>
      </div>
    </button>
  );
};

const GuestList = () => {
  const [events, setEvents] = useState(null);
  let content = <div></div>;
  const myUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  let now = moment().format();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get(
          `/events?role=GUEST&from=${now}`
        );
        validateEvents(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for details."
        );
      }
    }
    fetchData();
  }, []);

  async function validateEvents(allEvents) {
    let validEvents = [...allEvents];
    for (let n in validEvents) {
      let response = await apiLoggedIn().get(
        `/events/${validEvents[n].id}/users?eventUserStatus=CANCELLED`
      );
      let currentCancelledUsers = response.data;

      for (let i in currentCancelledUsers) {
        if (currentCancelledUsers[i].username === myUsername) {
          validEvents.splice(n, 1);
        }
      }
    }
    setEvents(validEvents);
  }

  if (events) {
    content = (
      <div class="list-group">
        {events.map((event) => (
          <EventItem event={event} key={event.username} />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default GuestList;
