import MapStyles from "../../../styles/MapStyles";
import {GoogleMap, Marker} from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
    width: "100%",
    height: "20vw"
}
const options = {
    styles: MapStyles,
    //disableDefaultUI: true,
    streetViewControl: false,
}

const LocationMap = (props) => {
    const center = {
        lat: props.event.latitude,
        lng: props.event.longitude,
    }
    return (
        <div>
            <h2>{props.event.locationName}</h2>
            <GoogleMap
                mapContainerClassName={"location-spec-map"}
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
            >
                <Marker
                    key={props.event.id}
                    position={{lat: props.event.latitude, lng: props.event.longitude}}>
                </Marker>
            </GoogleMap>
        </div>
    );
}

export default LocationMap;