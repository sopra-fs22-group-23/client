import { useDrag, useDrop } from "react-dnd";
import { apiLoggedIn } from "../../../helpers/api";
import { useParams } from "react-router";

const MovableItem = (props) => {
  const { eventID } = useParams();

  //is called on drop
  const changeItemColumn = (currentItem, columnID) => {
    props.setItems((prevState) => {
      return prevState.map((e) => {
        console.log(e);
        console.log(currentItem);
        return {
          ...e,
          columnID: e.cardID === currentItem.cardID ? columnID : e.columnID,
          isMyTask: e.cardID === currentItem.cardID, //if it is the card, that was moved, make it my task
        };
        //when name is the same as of the element
      });
    });
  };

  const changeItemOnBackend = (currentItem, newColumn) => {
    try {
      const requestBody = JSON.stringify({ userID: newColumn });
      apiLoggedIn().put(
        "/events/" + eventID + "/tasks/" + currentItem.cardID,
        requestBody
      );
    } catch (error) {
      alert(`Something went wrong during the db update`);
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item: { cardID: props.cardID }, //important, this name must be unique
    type: "Card", //to disable movement
    collect: (monitor) => ({
      // isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
      isDragging: monitor.isDragging(),
    }),
    //TODO on drag strat send message to websocket
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
      if (dropResult) {
        changeItemColumn(item, dropResult.id); //changes the UI
        changeItemOnBackend(item, dropResult.id); //put method for the endpoint
        sendWebsocketMessageUnlock(dropResult.id); //will send the message on all other users
      } else {
        sendWebsocketMessageUnlock(props.columnID); //set with default column, because the column wasn't changed and we need to unlock the task
      }
    },
  });

  const sendWebsocketMessageUnlock = (columnID) => {
    try {
      props.StompClient.send(
        "/app/sessionScheduler/" + eventID,
        JSON.stringify({
          userID: localStorage.getItem("userId"),
          taskID: props.cardID,
          columnID: columnID,
          action: "UNLOCK",
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const sendWebsocketMessageLock = () => {
    try {
      props.StompClient.send(
        "/app/sessionScheduler/" + eventID,
        JSON.stringify({
          userID: localStorage.getItem("userId"),
          taskID: props.cardID,
          columnID: null,
          action: "LOCK",
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (isDragging) {
    //since isDragging is a hook, when it is changed the function is triggered, somehow wierd, but it seems to work
    sendWebsocketMessageLock();
  }

  const opacity = isDragging || props.disabled ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className="movable-item"
      style={{ opacity, "margin-left": "3px", "margin-right": "6px" }}
    >
      {props.name}
    </div>
  );
};

const Column = ({ children, title, id, disabled }) => {
  const [, drop] = useDrop({
    accept: disabled ? "" : "Card",
    drop: () => ({ id: id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className={`column ${disabled ? "disabled" : ""}`} ref={drop}>
      <div>
        <h6 className={"columnTitle"}>{title}</h6>
      </div>
      <div
        style={{
          height: "480px",
          "margin-bottom": "8px",
          "padding-top": "0px !important",
        }}
      >
        <div
          className="scrollable-list"
          style={{
            "padding-top": "0px !important",
            padding: "0px",
            " padding-right": "10px",
            "scroll-padding": "110px !important",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Column, MovableItem };
