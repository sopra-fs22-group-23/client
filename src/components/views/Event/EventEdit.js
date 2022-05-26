import Header from "../../ui/StandardComponents/Header";
import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../../ui/StandardComponents/FormField";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import { MyButton } from "../../ui/StandardComponents/MyButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "../../../styles/views/EditEvent.scss";
import "../../../styles/views/NewEvent.scss";
import InvitePopup from "../../ui/PopUps/InvitePopup";
import TaskPopup from "../../ui/PopUps/TaskPopup";
import PlacesInput from "../PlacesInput";

const EventEdit = (props) => {
  let { eventId } = useParams();
  const navigate = useNavigate();
  let [phase, setPhase] = useState("edit");

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const [title, setTitle] = useState(null);
  let status = "IN_PLANNING";
  const [description, setDescription] = useState(null);
  let [locationName, setLocation] = useState(null); //address from PlacesInput
  const [coordinates, setCoordinates] = useState(null);
  let latitude;
  let longitude;
  const [eventDate, setDate] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const prevLocation = useRef();
  useEffect(() => {
    prevLocation.current = props.event.locationName;
  }, []);

  const changeGameMode = (event) => {
    setGameMode(event.target.value);
  };

  /*
  function handleUpload(){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('test', "message");
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    const response = apiLoggedIn().post(`/events/${eventId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }*/

  const updateEvent = async () => {
    if (!locationName) {
      latitude = props.event.latitude;
      longitude = props.event.longitude;
      locationName = props.event.locationName;
    } else {
      latitude = coordinates.lat;
      longitude = coordinates.lng;
    }
    try {
      //--- Put Event Params ---//
      const requestBody = JSON.stringify({
        title,
        description,
        locationName,
        eventDate,
        longitude,
        latitude,
        gameMode,
      });
      const response = await apiLoggedIn().put(
        `/events/${eventId}`,
        requestBody
      );
      //handleUpload();

      window.location.reload();
    } catch (error) {
      alert(
        `Something went wrong during event update: \n${handleError(error)}`
      );
    }
  };

  const cancelEvent = async () => {
    if (!locationName) {
      latitude = props.event.latitude;
      longitude = props.event.longitude;
      locationName = props.event.locationName;
    } else {
      latitude = coordinates.lat;
      longitude = coordinates.lng;
    }
    status = "CANCELED";
    try {
      //--- Put Event Params ---//
      const requestBody = JSON.stringify({
        title,
        description,
        locationName,
        eventDate,
        longitude,
        latitude,
        status,
        gameMode,
      });
      const response = await apiLoggedIn().put(
        `/events/${eventId}`,
        requestBody
      );

      window.location.reload();
    } catch (error) {
      alert(`Something went wrong while cancelling: \n${handleError(error)}`);
    }
  };

  if (phase === "edit") {
    return (
      <div className="edit-container">
        <p className="edit-title">Edit your event:</p>
        <FormField
          label={"Title"}
          placeholder={"..."}
          onChange={(ti) => setTitle(ti)}
        />

        <FormField
          label={"Description"}
          placeholder={"..."}
          onChange={(dis) => setDescription(dis)}
        />

        <PlacesInput
          setLocation={setLocation.bind(this)}
          setCoordinates={setCoordinates.bind(this)}
        ></PlacesInput>

        <FormField
          type={"datetime-local"}
          label={"Date"}
          onChange={(date) => setDate(date)}
        />
        <div onChange={changeGameMode} className="event-type">
          <p className="event-type__label">Type</p>
          <input
            type="radio"
            value="ON"
            name="type"
            defaultChecked={props.event.gameMode === "ON"}
            className="event-type__value"
          />
          <p className="event-type__name">Stealing mode</p>
          <input
            type="radio"
            value="OFF"
            name="type"
            defaultChecked={props.event.gameMode === "OFF"}
            className="event-type__value"
          />
          <p className="event-type__name">Normal mode</p>
        </div>

        {/*<div className="image-field">
          <div>Add Image:</div>
          <input type="file" onChange={handleChange}/>
          <img className={"img"} src={file}/>
        </div>*/}
        <div style={{ float: "right" }}>
          <MyButton
            onClick={() => setPhase("cancel")}
            className="SaveEvent2"
            style={{
              "background-color": "DarkRed",
              width: "145px",
              "margin-right": "10px",
            }}
          >
            Cancel event
          </MyButton>
          <MyButton
            onClick={() => updateEvent()}
            className={"SaveEvent2"}
            style={{ width: "145px" }}
          >
            Save
          </MyButton>
        </div>
      </div>
    );
  }
  if (phase === "cancel") {
    return (
      <div className="edit-container">
        <p
          className="edit-title"
          style={{ "font-size": "22px", "font-weight": "600" }}
        >
          Are you sure you want to cancel this event?
        </p>
        <div style={{ display: "flex" }}>
          <MyButton
            onClick={() => setPhase("edit")}
            className={"SaveEvent3"}
            style={{ "margin-right": "10px" }}
          >
            Back
          </MyButton>
          <MyButton
            onClick={() => [cancelEvent(), window.location.reload()]}
            className={"SaveEvent3"}
            style={{ "background-color": "DarkRed" }}
          >
            Cancel
          </MyButton>
        </div>
      </div>
    );
  }
};
export default EventEdit;
