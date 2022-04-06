import {Column, MovableItem} from "./TaskSession/Elements";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./../../styles/taskSession/taskSession.scss"
import {useState} from "react";

const TaskSession = () =>{

    // const [isF_col, setF_Col] = useState(true);
    // const Item = <MovableItem setF_Col={setF_Col}/>

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