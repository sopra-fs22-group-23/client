import {FormField} from "./FormField";
import {MyButton} from "./MyButton";
import {React, useState} from "react";
import PropTypes from "prop-types";
import "../../styles/ui/AddTasks.scss";
import {apiLoggedIn, handleError} from "../../helpers/api";
import {useParams} from "react-router-dom";

const Task = ({ task }) => {
    return (
        <div className="task-item">
            <p className={"task"}>{task}</p>
        </div>
    );
};

Task.propTypes = {
    user: PropTypes.object,
};

const AddTasks = () => {

    let {eventId} = useParams();
    const [task, setTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    const postTasks = async () => {
        try {
            const requestBody = JSON.stringify({description : task});
            await apiLoggedIn().post(`/events/${eventId}/tasks`, requestBody);
        } catch (error) {
            alert(
                `Something went wrong during saving tasks: \n${handleError(error)}`
            );
        }
    }

    function saveTask(){
        const newTasks = [...tasks]
        newTasks.push(task);
        setTasks(newTasks);
        postTasks();
    }

    return (
        <div>
            <div className={"task-title"}>
                Saved Tasks:
            </div>
            <ul className={"task-list"}>
                {tasks.map((task) => {
                    return (
                        <div className="task-item" key={task}>
                            {task}
                        </div>
                    )
                })}
            </ul>
            <div className={"task-title"}>
                Add new task
            </div>
            <FormField
                placeholder={"New Task"}
                onChange={(task) => setTask(task)}>
            </FormField>
            <MyButton
                className="invite-btn"
                button type={"submit"}
                onClick={() => saveTask(task)}><p className={"invite-label"}>Save task!</p></MyButton>
        </div>
    );
};

export default AddTasks;