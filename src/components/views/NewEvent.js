import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import SelectInviteesCollaboratorsTasks from "../ui/SelectGuestsCollaborators";
import AddTasks from "../ui/AddTasks";
import "../../styles/views/NewEvent.scss";
import { MyButton } from "../ui/MyButton";

const NewEvent = ({}) => {
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  const [showTask, TaskPopup] = useState(false);
  const modalOpenTask = () => TaskPopup(true);
  const modalCloseTask = () => TaskPopup(false);

  return (
    <div>
      <MyButton onClick={modalOpen}>Select invitees</MyButton>
      <Modal show={show} onHide={modalClose}>
        <ModalBody>
          <SelectInviteesCollaboratorsTasks />
        </ModalBody>
      </Modal>

      <Button variant="success" onClick={modalOpenTask}>
        Select Tasks
      </Button>
      <Modal show={showTask} onHide={modalCloseTask}>
        <ModalBody>
          <AddTasks />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewEvent;
