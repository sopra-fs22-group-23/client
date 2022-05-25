import { Column, MovableItem } from "./Elements";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../../../styles/taskSession/taskSession.scss";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { apiLoggedIn } from "../../../helpers/api";
import { getDomainWS } from "../../../helpers/getDomain";
import Stomp from "webstomp-client";
import ChatWindow from "./ChatWindow";
import Footer from "./Footer";
import Header from "../../ui/StandardComponents/Header";

const TaskSession = () => {
  const { eventID } = useParams();

  //const get
  const [users, setUsers] = useState([
      // { id: 0, name: "Unknown" },
      // { id: 1, name: "seocnd user" },
  ]);

  const [items, setItems] = useState([
    // { cardID: 1, name: "item 1", columnID: 0 },
    // { cardID: 2, name: "item 2", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
    // { cardID: 3, name: "item 3", columnID: 0 },
  ]);
  const [event, setEvent] = useState(null)
  const [isStealingModeON, setIsStealingModeOn] = useState(null);

  //fetch users and tasks
  useEffect(() => {
    async function fetchUsers(eventID) {
      try {
        const response = await apiLoggedIn().get(
          "/events/" + eventID + "/users"
        );
        const admins = response.data.filter((r) => r.eventUserRole !== "GUEST");
        setUsers(admins);
        console.log(admins);
      } catch (error) {
        console.error(`Something went wrong while fetching the users}`);
        console.error("Details:", error);
        // alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    async function fetchTasks(eventID) {
      try {
        const response = await apiLoggedIn().get(
          "/events/" + eventID + "/tasks"
        );
        const transformed = response.data.map(
          ({ id, userID, description }) => ({
            cardID: id,
            columnID: userID ? userID : 0,
            name: description,
            disabled: false,
            isMyTask: userID === parseInt(localStorage.getItem('userId'))
          })
        );
        //0 since 0 is coded value for not assigned
        setItems(transformed);
        console.log(transformed);
      } catch (error) {
        console.error(`Something went wrong while fetching the users}`);
        console.error("Details:", error);
        // alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    async function fetchEvent(eventID) {
      try {
        const response = await apiLoggedIn().get(`/events/${eventID}`);
        setEvent(response.data)
        setIsStealingModeOn(response.data.gameMode === "ON");
      } catch (error) {
        console.error(`Something went wrong while fetching the users}`);
        console.error("Details:", error);
        // alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchUsers(eventID);
    fetchTasks(eventID);
    fetchEvent(eventID);
  }, []);


  //connect to websockets for this event
  let [SC, setSC] = useState(null);
  useEffect(() => {
    const path = getDomainWS();
    const WS = new WebSocket(path);
    SC = Stomp.over(WS);
    //TODO add name from local storage
    SC.connect({ username: "adam" }, function (frame) {
      SC.subscribe("/topic/sessionScheduler/"+eventID, function (messageOutput) {
        parseMessageTaskSession(messageOutput.body);
      });
      setSC(SC);
    });
    // console.log(SC);
  }, []);


  //called, when message comes from websockets
  const parseMessageTaskSession = (message) => {
    //message is string
    message = JSON.parse(message);
    console.log(message);

    //If user is not you, no need to reset items
    if (message.userID !== parseInt(localStorage.getItem("userId"))) {
      //alert("movement, please reload the page");

      //unlock move the message and set it not to disabled
      if(message.action === "UNLOCK"){
        setItems((prevState) => {
          return prevState.map((e) => {
            return {
              ...e,
              columnID:
                  (e.cardID === message.taskID && message.columnID !== null) ? message.columnID : e.columnID,//if the right was found and we also have recieved columnID
              disabled:
                  e.cardID === message.taskID ? false : e.disabled,
            };
            //when name is the same as of the element
          });
        });
      }
      //make the card disabled for now
      else{
        setItems((prevState) => {
          return prevState.map((e) => {
            return {
              ...e,
              disabled:
                  e.cardID === message.taskID ? true : e.disabled,
            };
            //when name is the same as of the element
          });
        });
      }


    }
  };

  //key is there unique property, each child should have it
  const   MovableItemsForColumn = (columnID) => {
    return items
      .filter((item) => item.columnID === columnID)
      .map((item) => (
        <MovableItem
          key={item.cardID}
          cardID={item.cardID}
          name={item.name}
          setItems={setItems}
          StompClient={SC}
          disabled={item.disabled}
        />
      ));
  };



  const shouldBeDisabledFor = (userID) => {
    if(isStealingModeON){
      return userID !== parseInt(localStorage.getItem('userId'))
    }
    return false;
  }

  let content = "loading";

  if (users) {
    content = "";
    content = users.map((user) => (
      <Column title={user.name} id={user.id} key={user.id} disabled={shouldBeDisabledFor(user.id)} myCol={user.id === parseInt(localStorage.getItem("userId"))}>
        {MovableItemsForColumn(user.id)}
      </Column>
    ));
  }

  return (
      <>
      <Header/>
      <div className={"taskContainer"}>

        <DndProvider backend={HTML5Backend}>
          {content}

          <Column title="Not assigned" id={0} disabled={isStealingModeON}>
            {MovableItemsForColumn(0)}
          </Column>
        </DndProvider>

        <Footer eventID={eventID}/>
      </div>
        <ChatWindow eventID={eventID}/>
      </>
  );
};

export default TaskSession;
