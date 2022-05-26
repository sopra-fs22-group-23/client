import React, { useEffect, useState } from "react";
import Header from "../ui/StandardComponents/Header";
import "../../styles/views/User.scss";
import { useParams } from "react-router-dom";
import { apiLoggedIn, handleError } from "../../helpers/api";
import pic from "../pictures/pic.png";
import badic from "../pictures/badic.png";
import { useNavigate } from "react-router";
import moment from "moment";
import {getDomain} from "../../helpers/getDomain";

const ProfileOverview = (props) => {
    let user = props.user;

    return (
        <div className="user">
            <div className="pic-description">
                <img src={getDomain() + "/users/" + user.id + "/image"} className={"userPic"}
                     onError={({ currentTarget }) => {
                         currentTarget.onerror = null; // prevents looping
                         currentTarget.src = pic;
                     }}/>
                <p className="hello-user">  @{user.username}</p>
            </div>
            <p></p>
            <div style={{height: "60%"}} className="user-container-list">
                <div className="container">
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
            <div className={"fixed-img-container"}>
                <img src={getDomain() + "/events/" + event.id + "/image"} className={"eventUser-img"}
                     onError={({ currentTarget }) => {
                         currentTarget.onerror = null; // prevents looping
                         currentTarget.src = badic;
                     }}/>
            </div>
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
        <div style={{height: "60%"}} className="user-container-list cl">
            <div className="user-scrollable-list">
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
                if(error.response.status === 401 || error.response.status === 404){//if the user is not authorized for the event, get the user back to homescreen
                    navigate("/home")

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


