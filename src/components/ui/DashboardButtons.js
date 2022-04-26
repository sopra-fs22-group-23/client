import React from "react";
import "../../styles/ui/DashboardButtons.scss";
import {apiLoggedIn, handleError} from "../../helpers/api";
import {useNavigate} from "react-router";
import EventEdit from "../views/EventEdit";

const DashboardButtons = () => {

    let eventId;
    const navigate = useNavigate();
    const title = "New Event";
    const type = "PUBLIC";
    const status = "IN_PLANNING";

    const newEvent = async () => {
        try {
            const requestBody = JSON.stringify({title, type, status});
            const response = await apiLoggedIn().post('/events', requestBody);
            eventId = response.data.id;
            navigate(`/event/${eventId}`)

        } catch (error) {
            alert(`Something went wrong during event creation: \n${handleError(error)}`);
        }
    };

  return (
    <div className="buttons">
      <button className="newEvent-button"
              onClick={() => newEvent()}>
        <label className="newEvent-label">New event!</label>
      </button>
      <a href="user" className="edit">
        edit
      </a>
    </div>
  );
};

export default DashboardButtons;
