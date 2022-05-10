import React, {useEffect, useState} from "react";
import Header from "../ui/StandardComponents/Header";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import MapStyles from "../../styles/MapStyles";
import {api, apiLoggedIn, handleError} from "../../helpers/api";

const libraries = ["places"]
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

    const [eventMarkers, setEventMarkers] = useState([]);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function loadEvents() {
            const response = await api.get("/events");
            setEvents(response.data);
        }
        loadEvents();
    }, []);

    /*const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    if(loadError) return "Error loading Map";
    if(!isLoaded) return "loading map..."; */

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
                        /*onClick={(event) => {
                            setEventMarkers((current) => [
                                ...current,
                                {
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng(),
                                    time: new Date(),
                                },
                            ]);
                        }}*/
                    >

                        {/*eventMarkers.map((marker) => (
                            <Marker
                                key={marker.time.toISOString()}
                                position={{lat: marker.lat, lng: marker.lng}}>
                            </Marker>
                        ))*/}
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
