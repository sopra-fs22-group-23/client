import React, {useEffect, useState} from "react";
import Header from "../ui/StandardComponents/Header";
import {GoogleMap, Marker} from "@react-google-maps/api";
import MapStyles from "../../styles/MapStyles";
import {api} from "../../helpers/api";
import "../../styles/views/Landing.scss"
import SearchEvents from "../ui/EventLists/SearchEvents";
import moment from "moment";

const mapContainerStyle = {
    width: "52vw",
    height: "65vh"
}
const center = {
    lat: 47.3686498,
    lng: 8.539182500000038,
}
const options = {
    styles: MapStyles,
    //disableDefaultUI: true,
    streetViewControl: false,
}

export default function Landing() {

    let now = moment().format();
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function loadEvents() {
            try {
                //Get public events with search keyword
                const response = await api.get(
                    `/events?type=PUBLIC&from=${now}`,
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
        loadEvents();
    }, []);

    let content = <div></div>
    if(events){
        content = (
            <div>
                <Header location={"Landing"}/>
                <div className={"row"}>
                    <div className={"col-5 list-container"}>
                        <SearchEvents/>
                    </div>
                    <div className={"col-7 map-container"}>
                        <p className={"map-title"}>Discover Public Events in Area</p>
                        <GoogleMap
                            mapContainerClassName={"map"}
                            mapContainerStyle={mapContainerStyle}
                            zoom={13}
                            center={center}
                            options={options}
                        >

                            {events.map((e) => (
                                <Marker
                                    key={e.id}
                                    position={{lat: e.latitude, lng: e.longitude}}>
                                </Marker>
                            ))}
                        </GoogleMap>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <>{content}</>
    );
};
