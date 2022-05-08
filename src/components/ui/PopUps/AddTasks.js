import {FormField} from "../StandardComponents/FormField";
import {MyButton} from "../StandardComponents/MyButton";
import {React, useEffect, useState} from "react";
import PropTypes from "prop-types";
import "../../../styles/ui/AddTasks.scss";
import {apiLoggedIn, handleError} from "../../../helpers/api";
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

    useEffect(() => {
        loadTasks();
    })

    async function loadTasks() {
        try {
            const response = await apiLoggedIn().get(`/events/${eventId}/tasks`);
            setTasks(response.data)
        } catch (error) {
            alert(
                `Something went wrong during loading tasks: \n${handleError(error)}`
            );
        }
    }

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
        postTasks();
        loadTasks();
    }

    let content = <div></div>
    if(tasks){
        content = (
            <div>
                <div className={"task-title"}>
                    Saved Tasks:
                </div>

                <ul className={"task-list"}>
                    {tasks.map((task) => {
                        return (
                            <div className="task-item" key={task}>
                                {task.description}
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
        )
    }

    return (
        <>{content}</>
    );
};

export default AddTasks;