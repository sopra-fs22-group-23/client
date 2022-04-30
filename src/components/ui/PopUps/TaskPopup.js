import React, {useState} from "react";
import {Button, Modal, ModalBody} from "react-bootstrap";
import AddTasks from "./AddTasks";

const TaskPopup = ({}) => {
    const [showTask, TaskPopup] = useState(false);
    const modalOpenTask = () => TaskPopup(true);
    const modalCloseTask = () => TaskPopup(false);

    return (
        <div>
            {/*<Button variant="success" onClick={modalOpenTask}>
                Select tasks
            </Button>*/}
            {modalOpenTask()}
            <Modal show={showTask} onHide={modalCloseTask}>
                <ModalBody>
                    <AddTasks />
                </ModalBody>
            </Modal>
        </div>
    );
}
export default TaskPopup;