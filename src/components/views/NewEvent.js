import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import AddInvitees from "../ui/AddInvitees";
import AddTasks from "../ui/AddTasks";
import "../../styles/views/NewEvent.scss";

const NewEvent = ({}) => {
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  const [showTask, TaskPopup] = useState(false);
  const modalOpenTask = () => TaskPopup(true);
  const modalCloseTask = () => TaskPopup(false);

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
