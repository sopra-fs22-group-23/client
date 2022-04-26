import { Column, MovableItem } from "./TaskSession/Elements";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./../../styles/taskSession/taskSession.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiLoggedIn } from "../../helpers/api";

const TaskSession = () => {
  const { eventID } = useParams();

  //TODO get all users for specific event - build columns

  //GET all users auf dem Event, die ADMIN oder COLLAB SIND
  //GET all TASKS from the endpoint

  //CREATE ENDPOINT where I can PATCH a task for userID - or send message to websocket server, that

  //const get
  const [users, setUsers] = useState([
    { id: 0, name: "Unknown" },
    { id: 1, name: "seocnd user" },
  ]);

  useEffect(() => {
    async function fetchUsers() {
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

    async function fetchTasks() {
      try {
        const response = await apiLoggedIn().get(
          "/events/" + eventID + "/tasks"
        );
        const transformed = response.data.map(
          ({ id, userID, description }) => ({
            cardID: id,
            columnID: userID ? userID : 0,
            name: description,
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

    fetchUsers();
    fetchTasks();
  }, [eventID]);

  const [items, setItems] = useState([
    { cardID: 1, name: "item 1", columnID: 0 },
    { cardID: 2, name: "item 2", columnID: 0 },
    { cardID: 3, name: "item 3", columnID: 0 },
  ]);

  //key is there unique property, each child should have it
  const MovableItemsForColumn = (columnID) => {
    return items
      .filter((item) => item.columnID === columnID)
      .map((item) => (
        <MovableItem
          key={item.cardID}
          cardID={item.cardID}
          name={item.name}
          setItems={setItems}
        />
      ));
  };

  let content = "loading";

  if (users) {
    content = "";
    //process them to create
    content = users.map((user) => (
      <Column title={user.name} id={user.id}>
        {MovableItemsForColumn(user.id)}
      </Column>
    ));
    // for(const user in users){
    //     const oneUser = users[user]
    //     console.log(oneUser)
    //     content += (
    //     <Column title={oneUser.name} id={oneUser.id}>
    //         {MovableItemsForColumn(oneUser.id)}
    //     </Column>)
    // }
  }

  return (
    <div className={"taskContainer"}>
      <DndProvider backend={HTML5Backend}>
        {content}

        <Column title="Not asigned" id={0}>
          {MovableItemsForColumn(0)}
        </Column>

        {/*<Column title="Adam" id="col1">*/}
        {/*    {MovableItemsForColumn("col1")}*/}
        {/*</Column>*/}

        {/*  <Column title="Beta" id="col2">*/}
        {/*      {MovableItemsForColumn("col2")}*/}
        {/*  </Column>*/}

        {/*  <Column title="Beta" id="col3">*/}
        {/*      {MovableItemsForColumn("col3")}*/}
        {/*  </Column>*/}

        {/*  <Column title="Beta" id="col4">*/}
        {/*      {MovableItemsForColumn("col4")}*/}
        {/*  </Column>*/}
      </DndProvider>
    </div>
  );
};

export default TaskSession;
