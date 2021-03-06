import Header from "../../ui/StandardComponents/Header";
import React, { useState } from "react";
import { FormField } from "../../ui/StandardComponents/FormField";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import { MyButton } from "../../ui/StandardComponents/MyButton";
import { useNavigate } from "react-router";
import "../../../styles/views/EditEvent.scss";
import moment from "moment";
import InviteGuestsCollabs from "../../ui/AddInvitees/InviteGuestsCollabs";
import PlacesInput from "../PlacesInput";
import Bar1 from "../../pictures/Bar1.svg";
import Bar2 from "../../pictures/Bar2.svg";
import Bar3 from "../../pictures/Bar3.svg";
import Bar4 from "../../pictures/Bar4.svg";

const CreateEvent = (props) => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("infos");
  const [progressBar, setProgressBar] = useState(Bar1);

  let content;
  const [eventId, setEventId] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [locationName, setLocation] = useState(null); //address from PlacesInput
  const [coordinates, setCoordinates] = useState(null);
  let latitude;
  let longitude;

  const [eventDate, setDate] = useState(null);
  const [type, setType] = useState("PRIVATE");

  const updateInfos = async () => {
    latitude = coordinates.lat;
    longitude = coordinates.lng;
    try {
      setDate(moment.utc(eventDate).format("Do MMMM YYYY, H:mm"));
      const requestBody = JSON.stringify({
        title,
        description,
        locationName,
        eventDate,
        type,
        longitude,
        latitude,
      });
      const response = await apiLoggedIn().post(`/events`, requestBody);
      setEventId(response.data.id);
      setPhase("guests-collaborators");
      setProgressBar(Bar2);
    } catch (error) {
      alert(
        `Something went wrong during event creation: \n${handleError(error)}`
      );
    }
  };

    const [file, setFile] = useState(null);

    function handleChange(e) {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    function handleUpload() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('test', "message");
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const response = apiLoggedIn().post(`/events/${eventId}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  //Phase 1: insert infos
  const infos = (
    <div>
      <p className="edit-title">Create your event:</p>
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
        min={new Date().toISOString().slice(0, -8)}
        onChange={(date) => setDate(date)}
      />
      <div onChange={onChangeType} className="event-type">
        <p className="event-type__label">Type</p>
        <input
          type="radio"
          value="PRIVATE"
          name="type"
          defaultChecked
          className="event-type__value"
        />
        <p className="event-type__name">Private</p>
        <input
          type="radio"
          value="PUBLIC"
          name="type"
          className="event-type__value"
        />
        <p className="event-type__name">Public</p>
      </div>
      <MyButton
        onClick={() => updateInfos()}
        className={"SaveEvent"}
        disabled={
          title === null ||
          description === null ||
          locationName === null ||
          eventDate === null ||
          title === "" ||
          description === "" ||
          locationName === "" ||
          eventDate === ""
        }
      >
        Save
      </MyButton>
    </div>
  );

  //Phase 3: picture
  const picture = (
    <div className="image-field">
        <p className={"image-label"}>Add image:</p>
          <input type="file" onChange={handleChange}/>
          <img className={"img"} src={file}/>
        <p className={"image-limit"}>(Max size 1.5MB)</p>

      <MyButton onClick={() => [handleUpload(), navigate(`/event/${eventId}`)]}>Save! </MyButton>
    </div>
  );

  const setPhase3 = () => {
    setPhase("picture");
    setProgressBar(Bar4);
  };

  const setBar3 = () => {
    setProgressBar(Bar3);
  };

  const chooseContent = () => {
    if (phase === "infos") {
      content = infos;
    }
    if (phase === "guests-collaborators") {
      content = (
        <InviteGuestsCollabs
          setPhase3={setPhase3.bind(this)}
          setBar3={setBar3.bind(this)}
          eventId={eventId}
        />
      );
    }
    if (phase === "picture") {
      content = picture;
    }
    return content;
  };

  return (
    <div>
      <Header />

      <img src={progressBar} className="background" />
      <div className="create-container">{chooseContent()}</div>
    </div>
  );
};
export default CreateEvent;
