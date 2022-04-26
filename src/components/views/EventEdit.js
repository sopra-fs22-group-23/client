import Header from "./Header";
import React, { useState } from "react";
import Footer from "../ui/Footer";
import { FormField } from "../ui/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/MyButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const EventEdit = (props) => {
  let { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);

  const updateEvent = async () => {
    console.log("Ciao cacao");
    try {
      const requestBody = JSON.stringify({
        title,
        description,
        location,
        date,
        status,
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
      <div>
        <FormField
          label={"title"}
          placeholder={"..."}
          onChange={(ti) => setTitle(ti)}
        ></FormField>
        <FormField
          label={"description"}
          placeholder={"..."}
          onChange={(dis) => setDescription(dis)}
        ></FormField>
        <FormField
          label={"location"}
          placeholder={"..."}
          onChange={(loc) => setLocation(loc)}
        ></FormField>
        <FormField
          label={"date"}
          placeholder={"..."}
          onChange={(date) => setDate(date)}
        ></FormField>
        <FormField
          label={"status"}
          placeholder={"..."}
          onChange={(stat) => setStatus(stat)}
        ></FormField>
        <MyButton onClick={() => updateEvent()}>Save</MyButton>
      </div>
      <Footer />
    </div>
  );
};
export default EventEdit;
