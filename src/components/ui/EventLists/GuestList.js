import { useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
import "../../../styles/ui/EventItem.scss";
import pic from "../../pictures/pizza.jpeg";

const EventItem = ({ event }) => (
  <div className="event-item">
    <img src={pic} className="img" />
    <div className="info">
      <p className="event-name">{event.title}</p>
      <p className="event-information">
        {event.eventDate} · {event.locationName}
      </p>
    </div>
  </div>
);

EventItem.propTypes = {
  event: PropTypes.object,
};

const GuestList = () => {
  const [events, setEvents] = useState(null);
  let content = <div></div>;
  const token = localStorage.getItem("token");

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

  if (events && token) {
    content = (
      <ul class="list-group">
        {events.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </ul>
    );
  }

  return <div>{content}</div>;
};

export default GuestList;