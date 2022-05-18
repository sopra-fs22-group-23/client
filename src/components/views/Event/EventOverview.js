import {React, useEffect, useState} from "react";
import "../../../styles/ui/EventOverview.scss";
import pic from "../../pictures/pic.png";
import share from "../../pictures/share.png";
import {apiLoggedIn} from "../../../helpers/api";
import PropTypes from "prop-types";
import moment from "moment";
import {Modal, ModalBody} from "react-bootstrap";
import LocationMap from "../../ui/PopUps/LocationMap";

const GuestList = ({user}) => <div>{user.username},&nbsp; </div>;

GuestList.propTypes = {
    user: PropTypes.object,
};

const EventOverview = (props) => {
    const [eventUsers, setEventUsers] = useState(null);

    //--- Map Popup ---//
    const [showMap, popupMap] = useState(false);
    const modalOpenMap = () => popupMap(true);
    const modalCloseMap = () => popupMap(false);

    useEffect(() => {
        async function loadEventUsers() {
            const response = await apiLoggedIn().get(
                `/events/${props.event.id}/users`
            );
            setEventUsers(response.data);
        }

        loadEventUsers();
    }, []);

    let content = "";

    const translateEventType = () => {
        if (props.event.type === "PUBLIC") {
            return "Public";
        }
        return "Private";
    };

    const translateEventStatus = () => {
        if (props.event.status === "IN_PLANNING") {
            return "in planning";
        }
        if (props.event.status === "READY") {
            return "ready";
        }
        if (props.event.status === "IN_SESSION") {
            return "in session";
        }
        if (props.event.status === "CANCELED") {
            return "canceled";
        }
        if (props.event.status === "PAST") {
            return "past";
        }
        if (props.event.status === "COMPLETED") {
            return "completed";
        }
    };

    if (eventUsers) {
        content = (
            <div className="event">
                <div className="event-title">{props.event.title}</div>
                <div className="event-description">{props.event.description}</div>
                <div className="event-organizer">
                    <img src={pic} className="small-profile-pic"/>
                    <div className="organizer-name">
                        {translateEventType()} event by {props.admin.username}
                    </div>
                    <div className="creation-time">
                        happening {moment.utc(props.event.eventDate).fromNow()}
                    </div>
                    <div className="creation-time">
                        Event status: {translateEventStatus()}
                    </div>
                </div>
                <div className="event-information">
                    <div className="event-information-title"> This event includes</div>
                    <div className="row">
                        <div className="col event-information-element">
                            💪🏼 &nbsp;Collaborators:&nbsp;
                            {props.collaborators.map((user) => (
                                <GuestList user={user} key={user.id}/>
                            ))}
                        </div>
                        <div className="col event-information-element">
                            &nbsp;📍 &nbsp;&nbsp;
                            <div>
                                <button
                                    className={"overview-location"}
                                    onClick={() => modalOpenMap()}>
                                    <img className={"text-icons"} src={share}></img>{props.event.locationName}
                                </button>
                            </div>
                        </div>
                        <div className="w-100"></div>
                        <div className="col event-information-element">
                            👥 &nbsp;{eventUsers.length} person(s) are taking part!
                        </div>
                        <div className="col event-information-element">
                            🕓️ &nbsp;
                            {moment.utc(props.event.eventDate).format("Do MMMM YYYY, H:mm")}
                        </div>
                    </div>
                </div>
                <Modal show={showMap} onHide={modalCloseMap}>
                    <ModalBody>
                        <LocationMap event={props.event} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    return <div>{content}</div>;
};

export default EventOverview;
