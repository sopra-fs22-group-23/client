import Header from "../../ui/StandardComponents/Header";
import React, { useState } from "react";
import { FormField } from "../../ui/StandardComponents/FormField";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import { MyButton } from "../../ui/StandardComponents/MyButton";
import { useNavigate } from "react-router";
import "../../../styles/views/EditEvent.scss";
import SelectGuestsCollaboratorsNew from "../../ui/SelectGuestsCollaborators";
import moment from "moment";

const CreateEvent = (props) => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("infos");

  let content;
  const [eventId, setEventId] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [locationName, setLocation] = useState(null);
  const [eventDate, setDate] = useState(null);
  const [type, setType] = useState("PRIVATE");

  const updateInfos = async () => {
    try {
      setDate(moment.utc(eventDate).format("Do MMMM YYYY, H:mm"));
      const requestBody = JSON.stringify({
        title,
        description,
        locationName,
        eventDate,
        type,
      });
      const response = await apiLoggedIn().post(`/events`, requestBody);
      setEventId(response.data.id);
      setPhase("guests-collaborators");
    } catch (error) {
      alert(
        `Something went wrong during event creation: \n${handleError(error)}`
      );
    }
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  //Phase 1: insert infos
  //TODO: add location api
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
      <FormField
        label={"Location"}
        placeholder={"..."}
        onChange={(loc) => setLocation(loc)}
      />
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
  //TODO: add component
  const picture = (
    <div>
      <p>Picture!</p>
      <MyButton onClick={() => navigate(`/event/${eventId}`)}>Save! </MyButton>
    </div>
  );

  const setPhase3 = () => {
    setPhase("picture");
  };

  const chooseContent = () => {
    if (phase === "infos") {
      content = infos;
    }
    if (phase === "guests-collaborators") {
      content = (
        <SelectGuestsCollaboratorsNew
          setPhase3={setPhase3.bind(this)}
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
      <div className="edit-container">{chooseContent()}</div>
    </div>
  );
};
export default CreateEvent;
