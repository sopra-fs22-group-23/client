import Header from "../../ui/StandardComponents/Header";
import React, {useEffect, useRef, useState} from "react";
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

  const [file, setFile] = useState(null);
  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  let [locationName, setLocation] = useState(null); //address from PlacesInput
  const[coordinates, setCoordinates] = useState(null);
    let latitude;
    let longitude;
  const [eventDate, setDate] = useState(null);
  const prevLocation = useRef();
  useEffect(() => {
    prevLocation.current = props.event.locationName;
  }, []);

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
    if(!locationName){
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

  return (
    <div>
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
            setCoordinates={setCoordinates.bind(this)}>
        </PlacesInput>

        <FormField
            type={"datetime-local"}
            label={"Date"}
            onChange={(date) => setDate(date)}
        />

        {/*<div className="image-field">
          <div>Add Image:</div>
          <input type="file" onChange={handleChange}/>
          <img className={"img"} src={file}/>
        </div>*/}

        <MyButton
            onClick={() => updateEvent()}
            className={"SaveEvent"}>Save</MyButton>
      </div>
    </div>
  );
};
export default EventEdit;
