
import {useDrag, useDrop} from "react-dnd";
import {apiLoggedIn} from "../../../helpers/api";
import {useParams} from "react-router";


const MovableItem = (props) => {

    const { eventID } = useParams();

    //is called on drop
    const changeItemColumn = (currentItem, columnID)=>{
        props.setItems((prevState) => {
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
            const requestBody = JSON.stringify({userID: newColumn});
            apiLoggedIn().put("/events/"+eventID+"/tasks/"+currentItem.cardID, requestBody)
        }
        catch (error) {
            alert(`Something went wrong during the db update`);
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: { cardID: props.cardID},//important, this name must be unique
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
                changeItemColumn(item, dropResult.id)//changes the UI
                changeItemOnBackend(item, dropResult.id)//put method for the endpoint
                // props.StompClient();
                sendWebsocketMessageDown(dropResult.id)//will send the message on all other users
            }
        },
    });

    const sendWebsocketMessageDown = (columnID) =>{
        try{
            props.StompClient.send("/app/sessionScheduler/"+eventID, JSON.stringify(
                {'userID':localStorage.getItem("userId"),
                        'taskID': props.cardID,
                        'columnID': columnID,
                        'action': "UNLOCK"}));
        }
        catch (e) {
            console.log(e);
        }
    }

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{  opacity }}>
            {props.name}
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
