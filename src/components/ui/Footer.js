import "../../styles/ui/Footer.scss";
import { React, useEffect, useState } from "react";
import { apiLoggedIn, api, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router";
import AddTasks from "./PopUps/AddTasks";
import { Modal, ModalBody } from "react-bootstrap";
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

  //--- Task Popup ---//
  const [showTask, TaskPopup] = useState(false);
  const modalOpenTask = () => TaskPopup(true);
  const modalCloseTask = () => {
    TaskPopup(false);
    window.location.reload();
  };

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
      window.location.reload();
    } catch (error) {
      alert(
        `Something went wrong during inviting myself to this public event: \n${handleError(
          error
        )}`
      );
    }
  };

  //TODO: disable when session finished
  const sessionButton = (
    <button
      className="role-button"
      onClick={() => navigate(`/taskSession/${eventId}`)}
    >
      Open session
    </button>
  );

  const addTasksButton = (
    <>
      <button
        className="role-button add-buttons"
        style={{
          "vertical-align": "middle",
          width: "500px !important",
          "margin-right": "20px",
        }}
        onClick={() => modalOpenTask()}
      >
        + Tasks
      </button>

      <Modal show={showTask} onHide={modalCloseTask}>
        <ModalBody>
          <AddTasks />
        </ModalBody>
      </Modal>
    </>
  );

  const joinPublicEventButton = (
    <button
      className="role-button"
      onClick={() => inviteMyself()}
    >
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
    if (props.myRole === "ADMIN") {
      return (
        <div className="d-flex" style={{ "margin-left": "auto" }}>
          {addTasksButton}
          {sessionButton}
        </div>
      );
    }
    if (props.myRole === "COLLABORATOR") {
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
