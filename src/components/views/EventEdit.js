import Header from "./Header";
import React, { useState } from "react";
import { FormField } from "../ui/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/MyButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
// import NewEvent from "./NewEvent";
import "../../styles/views/EditEvent.scss";

const EventEdit = (props) => {
  let { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);

  const updateEvent = async () => {
    try {
      const requestBody = JSON.stringify({
        title,
        description,
        location,
        date,
      });
      const response = await apiLoggedIn().put(
        `/events/${eventId}`,
        requestBody
      );
      navigate(`/event/${eventId}`);
    } catch (error) {
      alert(
        `Something went wrong during event update: \n${handleError(error)}`
      );
    }
  };

  return (
    <div>
      <Header />
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

        <MyButton onClick={() => updateEvent()}>Save</MyButton>
        {/* <NewEvent></NewEvent> */}
      </div>
    </div>
  );
};
export default EventEdit;
