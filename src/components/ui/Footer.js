import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import { apiLoggedIn, api, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router";

const Footer = (props) => {
  const navigate = useNavigate();
  let { eventId } = useParams();
  let [tasks, setTasks] = useState([]);
  let [collaborators, setCollaborators] = useState(null);

  const inviteMyself = async () => {
    try {
      if (props.myStatus === "CANCELLED") {
        const requestBody = JSON.stringify({
          id: localStorage.getItem("userId"),
          eventUserRole: "GUEST",
          eventUserStatus: "INVITED",
        });
        const response = await api().put(
          `/events/${eventId}/users`,
          requestBody
        );
      } else {
        const requestBody = JSON.stringify({
          id: localStorage.getItem("userId"),
          eventUserRole: "GUEST",
        });
        const response = await apiLoggedIn().post(
          `/events/${eventId}/users`,
          requestBody
        );
      }
    } catch (error) {
      alert(
        `Something went wrong during inviting myself to this public event: \n${handleError(
          error
        )}`
      );
    }
    window.location.reload();
  };

  //BUG: disabled doesn't always work
  //TODO: disable when session finished
  const sessionButton = (
    <button
      className="role-button"
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Open session
    </button>
  );

  const joinPublicEventButton = (
    <button className="role-button" onClick={() => inviteMyself()}>
      Join Event!
    </button>
  );

  // async function loadTasks() {
  //   const response = await apiLoggedIn().get(`/events/${eventId}/tasks`);
  //   const receivedTasks = response.data;
  //   setTasks(receivedTasks);

  //   const allUsers = await apiLoggedIn().get(`/events/${eventId}/users`);
  //   let collaborators = allUsers.data.filter(
  //     (r) => r.eventUserRole === "COLLABORATOR"
  //   );
  //   setCollaborators(collaborators);
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        if (props.myRole === "ADMIN" || props.myRole === "COLLABORATORS") {
          const response = await apiLoggedIn().get(`/events/${eventId}/tasks`);
          const receivedTasks = response.data;
          setTasks(receivedTasks);

          const allUsers = await apiLoggedIn().get(`/events/${eventId}/users`);
          let collaborators = allUsers.data.filter(
            (r) => r.eventUserRole === "COLLABORATOR"
          );
          setCollaborators(collaborators);
        }
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
  }, [tasks]);

  const chooseButtons = () => {
    console.log(props.myStatus);
    if (props.event.status === "CANCELED") {
      return <p className="news-canceled">This event has been canceled</p>;
    }
    if (props.myRole === "ADMIN" || props.myRole === "COLLABORATOR") {
      return sessionButton;
    }
    if (props.myRole === "GUEST" && props.event.type === "PUBLIC") {
      return (
        <p className="news-participating">
          You are partecipating to this event!
        </p>
      );
    }
    if (props.event.type === "PUBLIC" && props.myRole === null) {
      return joinPublicEventButton;
    }
  };

  let chooseShadow = () => {
    if (props.event.status === "CANCELED") {
      return "rectangle-canceled";
    }
    return "rectangle-in-planning";
  };

  let content = (
    <div className={chooseShadow()}>
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
            {moment.utc(props.event.eventDate).format("H:mm")}
          </div>
        </div>
        <div className="location">
          <div className="location-title">Location</div>
          <div className="location-real">{props.event.locationName}</div>
        </div>
        {chooseButtons()}
      </div>
    </div>
  );

  return <>{content}</>;
};

export default Footer;
