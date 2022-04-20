
import {useDrag, useDrop} from "react-dnd";
import {apiLoggedIn} from "../../../helpers/api";
import {useParams} from "react-router";


const MovableItem = ({cardID, name, setItems}) => {

    const { eventID } = useParams();

    //is called on drop
    const changeItemColumn = (currentItem, columnID)=>{
        setItems((prevState) => {
            return prevState.map(e =>{
                console.log(e)
                console.log(currentItem)
                return {...e, columnID : e.cardID === currentItem.cardID ? columnID : e.columnID}
                //when name is the same as of the element
            })
        })
    }

    const changeItemOnBackend = (currentItem, newColumn)=>{
        try{
            console.log(newColumn);
            const requestBody = JSON.stringify({userID: newColumn});
            console.log(requestBody);
            apiLoggedIn().put("/events/"+eventID+"/tasks/"+currentItem.cardID, requestBody)
        }
        catch (error) {
            alert(`Something went wrong during the db update`);
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: { cardID: cardID},//important, this name must be unique
        type: 'Card',
        // collect: (monitor) => ({
        //     isOver: monitor.isOver(),
        //     canDrop: monitor.canDrop(),
        // }),
        //TODO on drag strat send message to websocket
        end: (item, monitor) =>{
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
            if(dropResult){
                changeItemColumn(item, dropResult.id)
                changeItemOnBackend(item, dropResult.id)//put method for the endpoint
            }
        },

    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{  opacity }}>
            {name}
        </div>
        )
    }



const Column = ({children, title, id}) => {
    const [, drop] = useDrop({
        accept: 'Card',
        drop: () => ({id: id}),
    });


    return (
        <div className='column' ref={drop}>
            <div>{title}</div>
            {children}
        </div>
    )
}

export {Column, MovableItem}
