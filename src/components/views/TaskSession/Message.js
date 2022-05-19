import "../../../styles/taskSession/chat.scss"
import moment from "moment";
export default function Message(props){

    return(

        <div className={`message new ${props.personal ? "message-personal" : "" }` }>
            {/*<figure className="avatar"></figure>*/}
            {props.text}
            <div className="timestamp">
                {!props.personal ? props.username : null} {moment(props.datetime).format("ddd hh:mm")}
                </div>
        </div>


    )
}