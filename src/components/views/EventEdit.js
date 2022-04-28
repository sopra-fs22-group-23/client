import Header from "./Header";
import React, { useState } from "react";
import { FormField } from "../ui/FormField";
import { apiLoggedIn, handleError } from "../../helpers/api";
import { MyButton } from "../ui/MyButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "../../styles/views/EditEvent.scss";
import {Button, Modal, ModalBody} from "react-bootstrap";
import AddInvitees from "../ui/AddInvitees";
import AddTasks from "../ui/AddTasks";
import "../../styles/views/NewEvent.scss";

const InvitePopup = ({}) => {
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  return (
      <div>
        <Button variant="success" onClick={modalOpen}>
          Select invitees
        </Button>
        <Modal show={show} onHide={modalClose}>
          <ModalBody>
            <AddInvitees />
          </ModalBody>
        </Modal>
      </div>
  );
};

const TaskPopup = ({}) => {
  const [showTask, TaskPopup] = useState(false);
  const modalOpenTask = () => TaskPopup(true);
  const modalCloseTask = () => TaskPopup(false);

  return (
      <div>
        <Button variant="success" onClick={modalOpenTask}>
          Select tasks
        </Button>
        <Modal show={showTask} onHide={modalCloseTask}>
          <ModalBody>
            <AddTasks />
          </ModalBody>
        </Modal>
      </div>
  );
}

const EventEdit = (props) => {
  let { eventId } = useParams();
  const navigate = useNavigate()

  const [file, setFile] = useState(null);
  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);

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
  }

  const updateEvent = async () => {
    try {
      //--- Put Event Params ---//
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
      handleUpload();

      //navigate(`/event/${eventId}`);
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

        <div className="image-field">
          <div>Add Image:</div>
          <input type="file" onChange={handleChange} />
          <img className={"img"} src={file} />
        </div>

        <MyButton onClick={() => updateEvent()}>Save</MyButton>
        <div className={"d-flex"}>
            <InvitePopup/>
            <TaskPopup/>
        </div>
      </div>
    </div>
  );
};
export default EventEdit;
