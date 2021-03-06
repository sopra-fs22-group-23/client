import React, {useEffect, useState} from "react";
import "../../../styles/ui/EventItem.scss";
import "../../../styles/views/EventList.scss";
import "../../../styles/ui/SearchBar.scss";
import {useNavigate} from "react-router";
import pic from "../../pictures/badic.png";
import moment from "moment";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {api} from "../../../helpers/api";
import {getDomain} from "../../../helpers/getDomain";

const EventItem = ({ event }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/event/${event.id}`;
        navigate(path);
    };

    return (
        <button className="event-item" onClick={routeChange}>
            <img src={getDomain() + "/events/" + event.id + "/image"} className={"img"}
                 onError={({ currentTarget }) => {
                     currentTarget.onerror = null; // prevents looping
                     currentTarget.src=pic;
                 }}/>
            <div className="info">
                <p className="event-name">{event.title}</p>
                <p className="event-information location-field">
                    <>{moment(event.eventDate).format("Do MMM")} · {event.locationName}</>
                </p>
            </div>
        </button>
    );
};

EventItem.propTypes = {
    event: PropTypes.object,
};

const SearchEvents = () => {
    let now = moment().format();
    let [searchTerm, setSearchTerm] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    async function loadEvents() {
        try {
            //Get public events with search keyword
            const response = await api.get(
                `/events?type=PUBLIC&from=${now}&search=${searchTerm}`,
            );
            //Throw out cancelled events
            const eventsNotCancelled = response.data.filter(
                (r) => r.status !== "CANCELED"
            );
            setEvents(eventsNotCancelled);
        } catch (error) {
            console.error("Details:", error);
            alert(
                "Something went wrong while loading events! See the console for details."
            );
        }
    }

    function filterEvents(filterKey) {
        searchTerm = filterKey;
        loadEvents();
    }

    return (
        <div>
            <div className="row">
                <div className={"col-10"}>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search by keywords"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                    <Button
                        className={"col-2 searchButton"}
                        type={"submit"}
                        onClick={() => loadEvents()}
                    >Search
                    </Button>
            </div>
            <div className={"row filters justify-content-center"}>
                <button
                    className={"col-2 filter"}
                    onClick={() => filterEvents("free")}
                >free
                </button>
                <button
                    className={"col-2 filter"}
                    onClick={() => filterEvents("food pizza pasta nachos grill")}
                >food
                </button>
                <button
                    className={"col-2 filter"}
                    onClick={() => filterEvents("drinks beer wine gin bar")}
                >drinks
                </button>
                <button
                    className={"col-2 filter"}
                    onClick={() => filterEvents("music concert dj techno rave hiphop rnb rock")}
                >music
                </button>
                <button
                    className={"col-2 filter"}
                    onClick={() => filterEvents("ball foot volley tennis hockey jogging cycling")}
                >sports
                </button>
            </div>
            <div className={"px-auto event-list"}>
                <ul className="list-group">
                    {events.map((event) => (
                        <EventItem event={event} key={event.id}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchEvents;