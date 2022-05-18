import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import "../../styles/ui/EventOverview.scss";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router";
import {Modal, ModalBody} from "react-bootstrap";
import LocationMap from "./PopUps/LocationMap";
import EmailPopup from "./PopUps/EmailPopup";

const Footer = (props) => {
  const navigate = useNavigate();
  let { eventId } = useParams();
  let [tasks, setTasks] = useState([]);
  let [collaborators, setCollaborators] = useState(null);
  const isLoggedIn = localStorage.getItem("token");

  //--- Map Popup ---//
  const [showMap, popupMap] = useState(false);
  const modalOpenMap = () => popupMap(true);
  const modalCloseMap = () => popupMap(false);

  //--- Email Popup ---//
  const [showMail, popupMail] = useState(false);
  const modalOpenMail = () => popupMail(true);
  const modalCloseMail = () => popupMail(false);

  const inviteMyself = async () => {
    if(!isLoggedIn){
      modalOpenMail();
      return;
    }
    try {
      const requestBody = JSON.stringify({
        id: localStorage.getItem("userId"),
        eventUserRole: "GUEST",
      });
      const response = await apiLoggedIn().post(
        `/events/${eventId}/users`,
        requestBody
      );
    } catch (error) {
      alert(
        `Something went wrong during inviting myself to this public event: \n${handleError(
          error
        )}`
      );
    }
    //window.location.reload();
  };

  const uninviteMyself = () => {
    try {
      const requestBody = JSON.stringify({
        id: localStorage.getItem("userId"),
        eventUserStatus: "CANCELLED",
      });
      const response = apiLoggedIn().put(
        `/events/${eventId}/users`,
        requestBody
      );
    } catch (error) {
      alert(
        `Something went wrong during inviting myself to this public event: \n${handleError(
          error
        )}`
      );
    }
  };

  //BUG: disabled doesn't always work
  //TODO: disable when session finished
  const adminButton = (
    <button
      type="button"
      className="role-button"
      disabled={
        tasks.length === 0 ||
        collaborators === null ||
        collaborators === [] ||
        collaborators.length === 0
      }
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Start Session
    </button>
  );

  const collaboratorButton = (
    //TODO: disable button when session not started/finished
    <button
      className="role-button"
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Join Session
    </button>
  );

  const joinPublicEventButton = (
    <button className="role-button" onClick={() => inviteMyself()}>
      Join Event!
    </button>
  );

  //TODO: unjoin event onClick()
  const unjoinPublicEventButton = (
    <button className="role-button" onClick={() => uninviteMyself()}>
      Unjoin Event!
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
    if (props.event.status === "CANCELED") {
      return <p className="news-canceled">This event has been canceled</p>;
    }
    if (props.myRole === "ADMIN") {
      return adminButton;
    }
    if (props.myRole === "COLLABORATOR") {
      return collaboratorButton;
    }
    if (props.event.type === "PRIVATE" && props.myRole === "GUEST") {
      return <div></div>;
    }
    if (props.event.type === "PUBLIC" && props.myRole === "GUEST") {
      return unjoinPublicEventButton;
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
          <button
              className={"location-real footer-location"}
              onClick={() => modalOpenMap()}>
            {props.event.locationName}
          </button>
        </div>
        {chooseButtons()}
      </div>
      <Modal show={showMap} onHide={modalCloseMap}>
        <ModalBody>
          <LocationMap event={props.event} />
        </ModalBody>
      </Modal>
      <Modal show={showMail} onHide={modalCloseMail}>
        <ModalBody>
          <EmailPopup event={props.event} />
        </ModalBody>
      </Modal>
    </div>
  );

  return <>{content}</>;
};

export default Footer;
