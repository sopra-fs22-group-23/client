import {Column, MovableItem} from "./TaskSession/Elements";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./../../styles/taskSession/taskSession.scss"
import {useState} from "react";
import {useParams} from "react-router";

const TaskSession = () =>{

    const { eventID } = useParams();

    //TODO get all users for specific event

   //GET all users auf dem Event, die ADMIN oder COLLAB SIND
    //GET all TASKS from the endpoint

    //CREATE ENDPOINT where I can PATCH a task for userID - or send message to websocket server, that

    const [items, setItems] = useState([
        {cardID: 1, name: "item 1", columnID: "col1"},
        {cardID: 2, name: "item 2", columnID: "col1"},
        {cardID: 3, name: "item 3", columnID: "col1"},
        ]
    )

    //key is there unique property, each child should have it
    const MovableItemsForColumn = (columnID) => {
        return items
            .filter((item)=>item.columnID === columnID)
            .map((item)=> <MovableItem key={item.cardID} cardID={item.cardID} name={item.name} setItems={setItems} />)
    }


    console.log(MovableItemsForColumn("col1"));

    return (
      <div className={"taskContainer"}>
          <DndProvider backend={HTML5Backend}>

            <Column title="Adam" id="col1">
                {MovableItemsForColumn("col1")}
            </Column>

              <Column title="Beta" id="col2">
                  {MovableItemsForColumn("col2")}
              </Column>

              <Column title="Beta" id="col3">
                  {MovableItemsForColumn("col3")}
              </Column>

              <Column title="Beta" id="col4">
                  {MovableItemsForColumn("col4")}
              </Column>
          </DndProvider>
      </div>

    );
}

export default TaskSession;