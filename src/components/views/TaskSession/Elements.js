
import {useDrag, useDrop} from "react-dnd";


const MovableItem = ({cardID, name, setItems}) => {

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

    const [{ isDragging }, drag] = useDrag({
        item: { cardID: cardID},//important, this name must be uniwue
        type: 'Card',
        // collect: (monitor) => ({
        //     isOver: monitor.isOver(),
        //     canDrop: monitor.canDrop(),
        // }),
        end: (item, monitor) =>{
            const dropResult = monitor.getDropResult();
            // console.log(dropResult);
            if(dropResult){
                changeItemColumn(item, dropResult.id)
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
