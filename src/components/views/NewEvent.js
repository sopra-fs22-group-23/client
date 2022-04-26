import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import AddInvitees from "../ui/AddInvitees";
import "../../styles/views/NewEvent.scss";

const NewEvent = ({}) => {
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

export default NewEvent;
