import React, {useEffect, useState} from "react";
import Header from "../ui/StandardComponents/Header";
import {GoogleMap, Marker} from "@react-google-maps/api";
import MapStyles from "../../styles/MapStyles";
import {api} from "../../helpers/api";

const mapContainerStyle = {
    width: "100vw",
    height: "85vh"
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
            <div>
                <Header />
                <div>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
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
