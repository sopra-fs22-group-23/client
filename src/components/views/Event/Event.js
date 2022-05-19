import React, { useEffect, useState } from "react";
import Footer from "../../ui/Footer";
import EventOverview from "./EventOverview";
import Header from "../../ui/StandardComponents/Header";
import "../../../styles/views/Event.scss";
import { useParams } from "react-router-dom";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import pic from "../../pictures/pic.png";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "react-bootstrap";
import AddGuests from "../../ui/AddInvitees/AddGuests";
import TasksOverview from "../../ui/PopUps/TasksOverview";
import EventEdit from "./EventEdit";
import AddCollaborators from "../../ui/AddInvitees/AddCollaborators";

const SmallProfileOverview = (props) => {
  let content = "";
  if (props.admin) {
    content = (
      <div className="profile-container">
        <div className="profile-info">
          <img src={pic} className="profile-pic" />
          <p className="profile-name">{props.admin.username} </p>
        </div>
        <div className="profile-description">
          My name is {props.admin.username} and I’m a student at UZH. I love
          organizing lasagne parties and coding. Let’s meet!
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

const Event = () => {
  let { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [myRole, setMyRole] = useState(null);
  const [myStatus, setMyStatus] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const myId = localStorage.getItem("userId");

  //--- Task Overview Popup ---//
  const [showTaskOverview, TaskOverviewPopup] = useState(false);
  const modalOpenTaskOverview = () => TaskOverviewPopup(true);
  const modalCloseTaskOverview = () => TaskOverviewPopup(false);

  //--- Edit Popup ---//
  const [showEdit, EditPopup] = useState(false);
  const modalOpenEdit = () => EditPopup(true);
  const modalCloseEdit = () => EditPopup(false);

  //--- invitee Popup ---//
  const [showinvitee, InviteePopup] = useState(false);
  const modalOpenInvitee = () => InviteePopup(true);
  const modalCloseInvitee = () => InviteePopup(false);

  //--- Collab Popup ---//
  const [showCollab, CollabPopup] = useState(false);
  const modalOpenCollab = () => CollabPopup(true);
  const modalCloseCollab = () => CollabPopup(false);

  function findMe(eventUsers) {
    for (let i in eventUsers) {
      if (String(eventUsers[i].id) === String(myId)) {
        setMyRole(eventUsers[i].eventUserRole);
        setMyStatus(eventUsers[i].eventUserStatus);
      }
    }
  }
  function findAdmin(eventUsers) {
    for (let j in eventUsers) {
      if (String(eventUsers[j].eventUserRole) === "ADMIN") {
        setAdmin(eventUsers[j]);
      }
    }
  }

  const chooseButtons = () => {
    if (event.status === "CANCELED") {
      return "";
    } else {
      if (myRole === "ADMIN" && event.type === "PRIVATE") {
        return adminButtonsPrivate;
      }
      if (myRole === "ADMIN" && event.type === "PUBLIC") {
        return adminButtonsPublic;
      }
      if (myRole === "COLLABORATOR") {
        return collaboratorButton;
      } else {
        return <div></div>;
      }
    }
  };

  const adminButtonsPrivate = (
    <div className="d-flex" style={{ width: "460px !important" }}>
      <button
        className="event-button"
        style={{ "margin-right": "26px", width: "280px" }}
        onClick={() => modalOpenEdit()}
      >
        <p className="event-label">Edit</p>
      </button>

      <Modal show={showEdit} onHide={modalCloseEdit}>
        <ModalBody>
          <EventEdit event={event} />
        </ModalBody>
      </Modal>
      <div>
        <button
          className="event-button-plus"
          style={{ "margin-right": "0px !important", "margin-bottom": "8px" }}
          onClick={() => modalOpenInvitee()}
        >
          <p className="event-label">+ Guests</p>
        </button>

        <Modal show={showinvitee} onHide={modalCloseInvitee}>
          <ModalBody style={{ "margin-bottom": "0px !important" }}>
            <AddGuests eventId={eventId} />
          </ModalBody>
        </Modal>

        <button
          className="event-button-plus"
          style={{ "margin-right": "0px !important" }}
          onClick={() => modalOpenCollab()}
        >
          <p className="event-label" style={{ color: "#212529 !important" }}>
            + Collaborators
          </p>
        </button>

        <Modal show={showCollab} onHide={modalCloseCollab}>
          <ModalBody style={{ "margin-bottom": "0px !important" }}>
            <AddCollaborators eventId={eventId} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );

  const adminButtonsPublic = (
    <div className={"d-flex"}>
      <button
        className="event-button"
        style={{ "margin-right": "26px" }}
        onClick={() => modalOpenEdit()}
      >
        <p className="event-label">Edit</p>
      </button>

      <Modal show={showEdit} onHide={modalCloseEdit}>
        <ModalBody>
          <EventEdit event={event} />
        </ModalBody>
      </Modal>

      <button className="event-button" onClick={() => modalOpenCollab()}>
        <p className="event-label" style={{ color: "#212529 !important" }}>
          + Collaborators
        </p>
      </button>

      <Modal show={showCollab} onHide={modalCloseCollab}>
        <ModalBody style={{ "margin-bottom": "0px !important" }}>
          <AddCollaborators
            event={event}
            collaborators={collaborators}
            eventId={eventId}
          />
        </ModalBody>
      </Modal>
    </div>
  );

  const collaboratorButton = (
    <div>
      <button className="event-button" onClick={() => modalOpenTaskOverview()}>
        <p className="event-label"> Tasks</p>
      </button>
      <Modal show={showTaskOverview} onHide={modalCloseTaskOverview}>
        <ModalBody>
          <TasksOverview />
        </ModalBody>
      </Modal>
    </div>
  );

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await apiLoggedIn().get(`/events/${eventId}`);
        const allEventUsers = await apiLoggedIn().get(
          `events/${eventId}/users`
        );
        setEvent(response.data);
        findMe(allEventUsers.data);
        findAdmin(allEventUsers.data);
        const collaborators = allEventUsers.data.filter(
          (r) => r.eventUserRole === "COLLABORATOR"
        );
        setCollaborators(collaborators);
      } catch (error) {
        console.error(
          `Something went wrong while loading the event: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while loading the event! See the console for details."
        );
      }
    }
    loadEvent();
  }, []);

  let content = "";

  if (event) {
    content = (
      <div>
        <Header location={"EventOverview"}/>
        <div className="row">
          <div className="col-7">
            <EventOverview
              event={event}
              admin={admin}
              collaborators={collaborators}
            />
          </div>
          <div className="col-4">
            <SmallProfileOverview admin={admin} />
            <div className="event-buttons">{chooseButtons()}</div>
          </div>
        </div>
        <Footer myRole={myRole} event={event} myStatus={myStatus} />
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Event;
