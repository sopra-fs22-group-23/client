import React, { useEffect, useState } from "react";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/User.scss";
import { useParams } from "react-router-dom";
import { apiLoggedIn, handleError } from "../../helpers/api";
import pic from "../pictures/pic.png";
import badic from "../pictures/badic.png";
import { useNavigate } from "react-router";
import AddTasks from "../ui/PopUps/AddTasks";
import { Modal, ModalBody } from "react-bootstrap";
// import AddInvitees from "../../ui/AddInvitees";
import TasksOverview from "../ui/PopUps/TasksOverview";
import EventEdit from "./Event/EventEdit";
import EventList from "./EventList";
import NextEvents from "../ui/NextEvents";
import moment from "moment";
import UserEdit from "./UserEdit";

const ProfileOverview = (props) => {
  let user = props.user;

  return (
    <div className="user">
      <div className="pic-description">
        <img src={pic} className="userPic" />
        <p className="hello-user">@{user.username}</p>
      </div>
      <p></p>
      <p className="user-title">Username:</p>
      <p className="user-description">{user.username}</p>
      <p className="user-title">Name:</p>
      <p className="user-description">{user.name}</p>
      <p className="user-title">Status:</p>
      <p className="user-description">{user.status}</p>
      <p className="user-title">Email:</p>
      <p className="user-description">{user.email}</p>
      <p className="user-title">Password:</p>
      <p className="user-description">*****</p>
      <p className="user-title">Birthday:</p>
      <p className="user-description">{user.birthday}</p>
      <p className="user-title">Biography:</p>
      <p className="user-description">{user.biography}</p>
    </div>
  );
};

const EventItem = (props) => {
  let navigate = useNavigate();
  let event = props.event;
  const taskList = props.taskList;
  const eventIds = props.eventIds;

  const tasks = taskList[eventIds.indexOf(event.id)] || [];

  const routeChange = () => {
    let path = `/event/${event.id}`;
    navigate(path);
  };

  return (
    <button className="eventUser-item" onClick={routeChange}>
      <img src={badic} className="eventUser-img" />

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
          <div className="container">
            <p className="eventUser-name">Tasks:</p>
            <div>
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
    <div style={{ height: "500px" }}>
      <div className="scrollable-list">
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

  console.log(eventIds);

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

  useEffect(() => {
    function loadEventIds() {
      let ids = [];
      for (let i = 0; i < eventUsers.length; i++) {
        ids.push(eventUsers[i].id);
      }
      return ids;
    }

    async function loadTasks() {
      try {
        let tasks = [];
        for (let i = 0; i < eventUsers.length; i++) {
          let response = await apiLoggedIn().get(
            `/events/${eventUsers[i].id}/users/${myId}/tasks`
          );
          let block = response.data;
          tasks.push(block);
        }
        await setTaskList(tasks);
      } catch (error) {
        console.error(
          `Something went wrong while loading the tasks: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while loading the tasks! See the console for details."
        );
      }
    }

    async function loadUser() {
      try {
        const response = await apiLoggedIn().get(`/users/${myId}`);
        await setUser(response.data);
        const allEventUsers = await apiLoggedIn().get(`/users/${myId}/events`);
        await setEventUsers(allEventUsers.data);
      } catch (error) {
        console.error(
          `Something went wrong while loading the user: \n${handleError(error)}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while loading the user! See the console for details."
        );
      }
    }

    loadUser();
    loadTasks();
    setEventIds(loadEventIds());
    //setTaskList(await loadTasks());
  }, [user]);

  let content = "";

  if (user) {
    content = (
      <>
        <Header />
        <div class="row">
          <div class="col-5">
            <div class="container">
              <div style={{ height: "600px" }}>
                <div className="scrollable-list">
                  <ProfileOverview user={user} />
                  <div className="user-buttons">
                    <button
                      className="user-button-left"
                      onClick={() => modalOpenEdit()}
                    >
                      <label className="user-label">Edit</label>
                    </button>
                    <Modal show={showEdit} onHide={modalCloseEdit}>
                      <ModalBody>
                        <UserEdit user={user} />
                      </ModalBody>
                    </Modal>
                  </div>
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
