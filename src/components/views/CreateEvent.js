import Header from "./Header";
import React, { useState } from "react";
import { FormField } from "../ui/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/MyButton";
import { useNavigate } from "react-router";
import "../../styles/views/EditEvent.scss";
import SelectGuestsCollaborators from "../ui/SelectGuestsCollaborators";

const CreateEvent = (props) => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("infos");

  let content;
  const [eventId, setEventId] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [locationName, setLocation] = useState(null);
  const [eventDate, setDate] = useState(null);

  const updateInfos = async () => {
    try {
      const requestBody = JSON.stringify({
        title,
        description,
        locationName,
        eventDate,
      });
      const response = await apiLoggedIn().post(`/events`, requestBody);
      setEventId(response.data.id);
      setPhase("guests-collaborators");
    } catch (error) {
      alert(
        `Something went wrong during event update: \n${handleError(error)}`
      );
    }
  };

  //Phase 1: insert infos
  const infos = (
    <div>
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
      <FormField
        label={"Location"}
        placeholder={"..."}
        onChange={(loc) => setLocation(loc)}
      />
      <FormField
        label={"Date"}
        placeholder={"..."}
        onChange={(date) => setDate(date)}
      />
      <MyButton
        onClick={() => updateInfos()}
        disabled={
          title === null ||
          description === null ||
          locationName === null ||
          eventDate === null
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
        <SelectGuestsCollaborators
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
