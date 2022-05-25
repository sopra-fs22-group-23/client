import { useEffect, useState } from "react";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import PropTypes from "prop-types";
import "../../../styles/ui/EventItem.scss";
import pic from "../../pictures/badic.png";
import { useNavigate } from "react-router";
import moment from "moment";
import {getDomain} from "../../../helpers/getDomain";

const EventItem = ({ event }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/event/${event.id}`;
    navigate(path);
  };

  return (
    <button className="event-item" onClick={routeChange}>
      <img src={getDomain() + "/events/" + event.id + "/image"} className={"img"}
           onError={({ currentTarget }) => {
             currentTarget.onerror = null; // prevents looping
             currentTarget.src=pic;
           }}/>
      <div className="info">
        <p className="event-name">{event.title}</p>
        <p className="event-information location-field">
          {moment(event.eventDate).format("Do MMM")} · {event.locationName}
        </p>
      </div>
    </button>
  );
};

EventItem.propTypes = {
  event: PropTypes.object,
};

const AdminList = () => {
  const [events, setEvents] = useState(null);
  let content = <div></div>;
  const token = localStorage.getItem("token");
  let now = moment().utc().format();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiLoggedIn().get(
          `/events?role=ADMIN&from=${now}`
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

export default AdminList;
