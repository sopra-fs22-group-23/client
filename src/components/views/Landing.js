import React, {useEffect, useState} from "react";
import Header from "../ui/StandardComponents/Header";
import {GoogleMap, Marker} from "@react-google-maps/api";
import MapStyles from "../../styles/MapStyles";
import {api} from "../../helpers/api";
import PublicList from "../ui/EventLists/PublicList";
import "../../styles/views/Landing.scss"
import {SearchBar} from "../ui/StandardComponents/SearchBar";

const mapContainerStyle = {
    width: "40vw",
    height: "60vh"
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

    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function loadEvents() {
            const response = await api.get("/events");
            setEvents(response.data);
        }
        loadEvents();
    }, []);

    let content = <div></div>
    if(events){
        content = (
            <div className={"view row"}>
                <Header />
                <div className={"col-4 list-container"}>
                    <SearchBar/>
                    <div className={"public-list"}><PublicList/></div>
                </div>
                <div className={"map-container col-6 offset-1"}>
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
        )
    }

    return (
        <>{content}</>
    );
};
