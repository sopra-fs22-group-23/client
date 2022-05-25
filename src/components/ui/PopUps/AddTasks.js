import { FormField } from "../StandardComponents/FormField";
import { MyButton } from "../StandardComponents/MyButton";
import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../styles/ui/AddTasks.scss";
import { apiLoggedIn, handleError } from "../../../helpers/api";
import { useParams } from "react-router-dom";

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
  let { eventId } = useParams();
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [help, setHelp] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [help]);

  async function loadTasks() {
    try {
      const response = await apiLoggedIn().get(`/events/${eventId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      alert(
        `Something went wrong during loading tasks: \n${handleError(error)}`
      );
    }
  }

  const postTasks = async () => {
    try {
      const requestBody = JSON.stringify({ description: task });
      await apiLoggedIn().post(`/events/${eventId}/tasks`, requestBody);
      setHelp(task);
    } catch (error) {
      alert(
        `Something went wrong during saving tasks: \n${handleError(error)}`
      );
    }
  };

  function saveTask() {
    postTasks();
    loadTasks();
  }

  let content = <div></div>;
  if (tasks) {
    content = (
      <div>
        <div className={"task-title"}>Saved Tasks:</div>
        <div
          style={{
            height: "200px",
            "margin-bottom": "8px",
            "padding-top": "0px !important",
          }}
        >
          <div
            className="scrollable-list"
            style={{
              "padding-top": "0px !important",
              padding: "0px",
              "scroll-padding": "110px !important",
            }}
          >
            <div className={"task-list"}>
              {tasks.map((task) => {
                return (
                  <div className="task-item" key={task}>
                    {task.description}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={"task-title"}>Add new task</div>
        <div className="d-flex" style={{ "margin-top": " 15px" }}>
          <input
            placeholder={"Type here a new task"}
            onChange={(e) => setTask(e.target.value)}
            className="task-input"
            style={{ width: "100%" }}
          ></input>
          <MyButton
            className="invite-btn"
            type={"submit"}
            onClick={() => saveTask(task)}
            style={{
              "margin-top": 0,
              "margin-left": "10px",
              width: "150px",
            }}
          >
            <p
              className={"invite-label"}
              style={{
                "font-size": "16px",
                "margin-top": "8px",
              }}
            >
              Save task!
            </p>
          </MyButton>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default AddTasks;
