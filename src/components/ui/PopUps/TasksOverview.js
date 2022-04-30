import PropTypes from "prop-types";
import {React, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiLoggedIn, handleError} from "../../../helpers/api";
import "../../../styles/ui/AddInvitees.scss";

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

const TasksOverview = () => {

    let {eventId} = useParams();
    const [task, setTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
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
        loadTasks();
    }, []);

    let content = (
        <div className={"task-title"}>
            Saved Tasks:
        </div>
    );

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
            </div>
        )
    }

    return (
        <>{content}</>
    );
};

export default TasksOverview;