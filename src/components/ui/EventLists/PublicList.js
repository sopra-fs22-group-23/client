import { useEffect, useState } from "react";
import {api, handleError} from "../../../helpers/api";
import PropTypes from "prop-types";
import "../../../styles/ui/EventItem.scss";
import "../../../styles/views/EventList.scss";
import pic from "../../pictures/pizza.jpeg";
import { useNavigate } from "react-router";
import moment from "moment";

const EventItem = ({ event }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/event/${event.id}`;
        navigate(path);
    };

    return (
        <button className="event-item" onClick={routeChange}>
            <img src={pic} className="img" />
            <div className="info">
                <p className="event-name">{event.title}</p>
                <p className="event-information">
                    {moment(event.eventDate).format("Do MMM")} · {event.locationName}
                </p>
            </div>
        </button>
    );
};

EventItem.propTypes = {
    event: PropTypes.object,
};

const PublicList = () => {
    const [events, setEvents] = useState(null);
    let content = <div></div>;
    const token = localStorage.getItem("token");
    let now = moment().format();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(
                    `/events?type=PUBLIC&from=${now}`
                );

                setEvents(response.data);
            } catch (error) {
                console.error(
                    `Something went wrong while fetching the users: \n${handleError(
                        error
                    )}`
                );
                console.error("Details:", error);
                alert(
                    "Something went wrong while fetching the users! See the console for detailss."
                );
            }
        }

        fetchData();
    }, []);

    if (events && token) {
        content = (
            <ul class="list-group">
                {events.map((event) => (
                    <EventItem event={event} key={event.id} />
                ))}
            </ul>
        );
    }

    return <div>{content}</div>;
};

export default PublicList;
