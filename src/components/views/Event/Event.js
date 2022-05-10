import React, { useEffect, useState } from "react";
import Footer from "../../ui/Footer";
import EventOverview from "./EventOverview";
import Header from "../../ui/StandardComponents/Header";
import "../../../styles/views/Event.scss";
import { useParams } from "react-router-dom";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import pic from "../../pictures/pic.png";
import { useNavigate } from "react-router";
import AddTasks from "../../ui/PopUps/AddTasks";
import { Modal, ModalBody } from "react-bootstrap";
import AddInvitees from "../../ui/PopUps/AddInvitees";
import SelectGuestsCollaborators from "../../ui/SelectGuestsCollaborators";
import TasksOverview from "../../ui/PopUps/TasksOverview";
import EventEdit from "./EventEdit";

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
  const [admin, setAdmin] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const navigate = useNavigate();
  const myId = localStorage.getItem("userId");

  //--- Task Popup ---//
  const [showTask, TaskPopup] = useState(false);
  const modalOpenTask = () => TaskPopup(true);
  const modalCloseTask = () => {
    TaskPopup(false);
    window.location.reload();
  };

  //--- Task Overview Popup ---//
  const [showTaskOverview, TaskOverviewPopup] = useState(false);
  const modalOpenTaskOverview = () => TaskOverviewPopup(true);
  const modalCloseTaskOverview = () => TaskOverviewPopup(false);

  //--- Invite Popup ---//
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  //--- Edit Popup ---//
  const [showEdit, EditPopup] = useState(false);
  const modalOpenEdit = () => EditPopup(true);
  const modalCloseEdit = () => EditPopup(false);

  function toEdit() {
    if (event) {
      navigate(`/event/${eventId}/edit`);
    }
  }

  function findMe(eventUsers) {
    for (let i in eventUsers) {
      if (String(eventUsers[i].id) === String(myId)) {
        setMyRole(eventUsers[i].eventUserRole);
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
    if (myRole === "ADMIN") {
      return adminButtons;
    }
    if (myRole === "COLLABORATOR") {
      return collaboratorButton;
    } else {
      return <div></div>;
    }
  };
  //TODO: layout +invitees button
  const adminButtons = (
    <div className={"d-flex"}>
      {/*<button className="event-button-left" onClick={() => toEdit()}>
        <label className="event-label">Edit</label>
      </button>*/}

      <button
          className="event-button-left"
          onClick={() => modalOpenEdit()}
      >
        <label className="event-label">Edit</label>
      </button>
      <div>
        <Modal show={showEdit} onHide={modalCloseEdit}>
          <ModalBody>
            <EventEdit event={event} />
          </ModalBody>
        </Modal>
      </div>

      <button
        className="event-button add-button"
        onClick={() => modalOpenTask()}
      >
        <label className="event-label"> + Tasks</label>
      </button>
      <div>
        <div>
          <Modal show={showTask} onHide={modalCloseTask}>
            <ModalBody>
              <AddTasks />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
  const collaboratorButton = (
    <div>
      <button className="event-button" onClick={() => modalOpenTaskOverview()}>
        <label className="event-label"> Tasks</label>
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
        <Header />
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
        <Footer myRole={myRole} event={event} />
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Event;
