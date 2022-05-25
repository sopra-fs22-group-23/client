import React, { useEffect, useState } from "react";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/User.scss";
import { useParams } from "react-router-dom";
import { apiLoggedIn, handleError } from "../../helpers/api";
import pic from "../pictures/pic.png";
import badic from "../pictures/badic.png";
import { useNavigate } from "react-router";
import moment from "moment";

const ProfileOverview = (props) => {
    let user = props.user;

    return (
        <div className="user">
            <div className="pic-description">
                <img src={pic} className="userPic" />
                <p className="hello-user">@{user.username}</p>
            </div>
            <p></p>
            <div style={{height: "500px"}}>
                <div className="scrollable-list">
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
            </div>
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
                <p className="eventUser-information">
                    Role: {event.eventUserRole} · Status: {event.eventUserStatus}
                </p>
            </div>
        </button>
    );
};

const EventUserList = ({ eventUsers }) => {
    //let events = props.eventUsers;

    console.log(eventUsers);


    return (
        <div style={{height: "500px"}}>
            <div className="scrollable-list">
                <div className="eventUser-list">
                    <ul className="list-group">
                        {eventUsers.map((event) => (
                            <EventItem event={event} key={event.id}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const EventUserOverview = (props) => {
    const eventUsers = props.eventUsers;

    return (
        <div className="user">
            <div className="eventUser-overview">
                <p className="hello-user">{props.user.username}'s events:</p>
                <EventUserList
                    eventUsers={eventUsers}
                />
            </div>
        </div>
    );
};

const User = () => {
    const [user, setUser] = useState(null);
    let { userId } = useParams();
    const [eventUsers, setEventUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await apiLoggedIn().get(`/users/${userId}`);
                setUser(response.data);
                const allEventUsers = await apiLoggedIn().get(
                    `/users/${userId}/events`
                );
                setEventUsers(allEventUsers.data);
            } catch (error) {
                if(error.status === 401 || error.status === 404){//if the user is not authorized for the event, get the user back to homescreen
                    navigate("/")
                }
                else {
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
        }
        loadUser();
    }, []);

    let content = "";

    console.log(eventUsers);

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
                        user={user}
                        />
                    </div>
                </div>
            </>
        );
    }

    return <div>{content}</div>;
};

export default User;


