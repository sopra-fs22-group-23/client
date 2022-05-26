import React, { useEffect, useState } from "react";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/User.scss";
import { apiLoggedIn, handleError } from "../../helpers/api";
import pic from "../pictures/pic.png";
import badic from "../pictures/badic.png";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "react-bootstrap";
import moment from "moment";
import UserEdit from "./UserEdit";
import {getDomain} from "../../helpers/getDomain";

const ProfileOverview = (props) => {
  let user = props.user;

  return (
      <div className="container lc">
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Username:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">{user.username}</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Name:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">{user.name}</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Email:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">{user.email}</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Password:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">*****</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Status:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">{user.status}</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Birthday:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description">{user.birthday}</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>
            <p className="user-title">Biography:</p>
          </div>
          <div className={"col-7"}>
            <p className="user-description user-bio">{user.biography}</p>
          </div>
        </div>
      </div>
  );
};

const EventItem = (props) => {
  let navigate = useNavigate();
  let event = props.event;
  const taskList = props.taskList;
  const eventIds = props.eventIds;

  const tasks = taskList[event.id] || [];

  const routeChange = () => {
    let path = `/event/${event.id}`;
    navigate(path);
  };

  return (
    <button className="eventUser-item" onClick={routeChange}>
      <img src={getDomain() + "/events/" + event.id + "/image"} className={"eventUser-img"}
           onError={({ currentTarget }) => {
             currentTarget.onerror = null; // prevents looping
             currentTarget.src = badic;
           }}/>
      <div className="event-overview">
        <div className="col-6">
          <div className="container">
            <div className="eventUser-info">
              <p className="eventUser-name">{event.title}</p>
              <p className="eventUser-information">
                {moment(event.eventDate).format("Do MMM")} ·{" "}
                {event.locationName}
              </p>
              <p className="eventUser-information">
                Role: {event.eventUserRole} · Status: {event.eventUserStatus}
              </p>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="container task-field">
            <p className="eventUser-name">Tasks:</p>
            <div className={"task-list-scroll"}>
              <ul className="list-group">
                {tasks.map((task) => (
                  <p className="event-tasks" key={task.id}>
                    - {task.description}
                  </p>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const EventUserList = (props) => {
  let events = props.eventUsers;
  let taskList = props.taskList;
  let eventIds = props.eventIds;

  return (
    <div style={{ height: "60%" }} className="user-container-list cl">
      <div className="user-scrollable-list">
        <div className="eventUser-list">
          <ul className="list-group">
            {events.map((event) => (
              <EventItem
                event={event}
                key={event.id}
                taskList={taskList}
                eventIds={eventIds}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const EventUserOverview = (props) => {
  let eventUsers = props.eventUsers;
  let taskList = props.taskList;
  let eventIds = props.eventIds;

  return (
    <div className="user">
      <div className="eventUser-overview">
        <p className="hello-user">Your events & tasks:</p>
        <EventUserList
          eventUsers={eventUsers}
          taskList={taskList}
          eventIds={eventIds}
        />
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const myId = localStorage.getItem("userId");
  const [eventUsers, setEventUsers] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [eventIds, setEventIds] = useState([]);

  //--- Edit Popup ---//
  const [showEdit, EditPopup] = useState(false);
  const modalOpenEdit = () => EditPopup(true);
  const modalCloseEdit = () => EditPopup(false);

  async function loadUsers() {
    const response = await apiLoggedIn().get(`/users/${myId}`);
    setUser(response.data);
    const allEventUsers = await apiLoggedIn().get(`/users/${myId}/events`);
    setEventUsers(allEventUsers.data);
  }

  async function loadTasks() {
    for(let i=0; i < eventUsers.length; i++){
      let fetchedTasks = await apiLoggedIn().get(`/events/${eventUsers[i].id}/users/${myId}/tasks`);
      setTaskList(prevState => {
        let old = Object.assign({}, prevState);
        old[eventUsers[i].id] = fetchedTasks.data;
        return old;
      });
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    loadTasks();
  }, [eventUsers]);

  let content = "";

  if (user) {
    content = (
      <>
        <Header />
        <div class="row">
          <div class="col-5">
            <div class="container">
              <div className="user">
                <div className="pic-description">
                  <img src={getDomain() + "/users/" + localStorage.getItem("userId") + "/image"} className={"userPic"}
                       onError={({ currentTarget }) => {
                         currentTarget.onerror = null; // prevents looping
                         currentTarget.src = pic;
                       }}/>
                  <p className="hello-user">Hi {user.username}!</p>
                </div>
              </div>
              <div style={{ height: "60%"}} className="user-container-list">
                <div className={"user"}>
                  <ProfileOverview user={user} />
                  <div className="user-buttons">
                    <div className={"row"}>
                      <div className={"col-4"}></div>
                      <div className={"col-7"}>
                        <button
                            className="user-button-left"
                            onClick={() => modalOpenEdit()}
                        >
                          <label className="user-label">Edit</label>
                        </button>
                      </div>
                    </div>
                    <Modal show={showEdit} onHide={modalCloseEdit}>
                      <ModalBody>
                        <UserEdit user={user} />
                      </ModalBody>
                    </Modal>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7">
            <EventUserOverview
              eventUsers={eventUsers}
              taskList={taskList}
              eventIds={eventIds}
              user={user}
            />
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default Profile;
