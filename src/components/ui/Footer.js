import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import { apiLoggedIn } from "../../helpers/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router";
import {MyButton} from "./StandardComponents/MyButton";

const Footer = (props) => {
  const navigate = useNavigate();
  let { eventId } = useParams();
  let [tasks, setTasks] = useState([]);
  let [collaborators, setCollaborators] = useState(null);

  const adminButton = (
    <button
      type="button"
      className="role-button"
      disabled={tasks.length === 0 || collaborators == null}
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Start Session
    </button>
  );

  const collaboratorButton = (
    //TODO: disable button when session not started
    <button
      className="role-button"
      disabled={false}
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Join Session
    </button>
  );

  useEffect(() => {
    async function loadTasks() {
      const response = await apiLoggedIn().get(`/events/${eventId}/tasks`);
      const allUsers = await apiLoggedIn().get(`/events/${eventId}/users`);
      const receivedTasks = response.data;
      const collaborators = allUsers.data.filter(
        (r) => r.eventUserRole === "COLLABORATOR"
      );
      setTasks(receivedTasks);
      setCollaborators(collaborators);
      /*console.log(receivedTasks);
      console.log("collaborators:" + collaborators);*/
    }
    loadTasks();
  }, []);

  const chooseButtons = () => {
    if (props.myRole === "ADMIN") {
      return adminButton;
    }
    if (props.myRole === "COLLABORATOR") {
      return collaboratorButton;
    } else {
      return <div></div>;
    }
  };

  let content = (
    <div className="rectangle">
      <div className="infos-event">
        <div className="date">
          <div className="date-title">Date</div>
          <div className="date-real">
            {moment(props.event.eventDate).format("Do MMM")}
          </div>
        </div>
        <div className="time">
          <div className="time-title">Time</div>
          <div className="time-real">
            {moment(props.event.eventDate).format("h:mm")}
          </div>
        </div>
        <div className="location">
          <div className="location-title">Location</div>
          <div className="location-real">{props.event.locationName}</div>
        </div>
        <MyButton
            className="role-button"
            onClick={() => navigate(`/home`)}>
          Back
        </MyButton>
        {chooseButtons()}
      </div>
    </div>
  );

    return <>{content}</>;
};

export default Footer;
