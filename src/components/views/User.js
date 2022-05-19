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
import SelectGuestsCollaborators from "../ui/SelectGuestsCollaborators";
import TasksOverview from "../ui/PopUps/TasksOverview";
import EventEdit from "./Event/EventEdit";
import EventList from "./EventList";
import NextEvents from "../ui/NextEvents";
import moment from "moment";

const ProfileOverview = (props) => {
    let user = props.user;
    return (
        <div className="user">
            <div className="pic-description">
                <img src={pic} className="userPic" />
                <p className="hello-user">User: {user.username}</p>
            </div>
            <p></p>
            <p className="user-title">Username:</p>
            <p className="user-description">{user.username}</p>
            <p className="user-title">Name:</p>
            <p className="user-description">{user.name}</p>
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

const EventItem = ({ event }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/event/${event.id}`;
        navigate(path);
    };

    return (
        <button className="eventUser-item" onClick={routeChange}>
            <img src={badic} className="eventUser-img" />
            <div className="eventUser-info">
                <p className="eventUser-name">{event.title}</p>
                <p className="eventUser-information">
                    {moment(event.eventDate).format("Do MMM")} · {event.locationName}
                </p>
            </div>
        </button>
    );
};

const EventUserList = (props) => {
    let events = props.eventUsers;

    return (
        <div className="eventUser-list">
            <ul className="list-group">
                {events.map((event) => (
                    <EventItem event={event} key={event.id}/>
                ))}
            </ul>
        </div>
    );
};

const EventUserOverview = (props) => {
    let eventUsers = props.eventUsers;

    return (
        <div className="user">
            <div className="eventUser-overview">
                <p className="hello-user">Event Overview</p>
                <EventUserList
                    eventUsers={eventUsers}
                />
            </div>
        </div>
    );
};

const User = () => {
    const [user, setUser] = useState(null);
    const myId = localStorage.getItem("userId");
    const [eventUsers, setEventUsers] = useState(null);



    useEffect(() => {
        async function loadUser() {
            try {
                const response = await apiLoggedIn().get(`/users/${myId}`);
                const allEventUsers = await apiLoggedIn().get(
                    `users/${myId}/events`
                );
                setUser(response.data);
                setEventUsers(allEventUsers.data);
            } catch (error) {
                console.error(
                    `Something went wrong while loading the user: \n${handleError(
                        error
                    )}`
                );
                console.error("Details:", error);
                alert(
                    "Something went wrong while loading the user! See the console for details."
                );
            }
        }
        loadUser();
    }, []);

    let content = "";

    if (user) {
        content = (
            <>
                <Header />
                <div class="row">
                    <div class="col-5">
                        <div class="container">
                            <ProfileOverview
                            user={user}
                            />
                        </div>
                    </div>
                    <div class="col-7">
                        <EventUserOverview
                        eventUsers={eventUsers}
                        />
                    </div>
                </div>
            </>
        );
    }

    return <div>{content}</div>;
};

export default User;


