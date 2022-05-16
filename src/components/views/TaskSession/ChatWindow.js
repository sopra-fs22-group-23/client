import "../../../styles/taskSession/chat.scss"
import {useEffect, useState} from "react";
import Message from "./Message";
import {getDomainWS} from "../../../helpers/getDomain";
import Stomp from "webstomp-client";
import {apiLoggedIn} from "../../../helpers/api";
import chatIcon from "./icons8-chat-100.png"

const ChatWindow = ({eventID}) => {

    const [text, setText] = useState("")
    const [showChat, setShowChat] = useState(true)
    const [messages, setMessages] = useState([
        {userID: 14, username: "thomas", message: "Welcome to the chat", datetime: new Date()}
    ])


    async function fetchMessages() {
        try {
            const response  =  await apiLoggedIn().get(
                "/events/" + eventID + "/messages"
            )
            console.log((response.data))
            setMessages(response.data)
        } catch (error) {
            console.error(`Something went wrong while fetching the users}`);
            console.error("Details:", error);
        }
    }

    useEffect(() => {
        let isMounted = true;

        fetchMessages();
        // let response;

        return () => {
            // console.log(response)
            // setMessages(response.body)
            isMounted = false;
        };
    }, []);


    //connect to websocket
    let [SC, setSC] = useState(null);
    useEffect(() => {
        const path = getDomainWS();
        const WS = new WebSocket(path);
        SC = Stomp.over(WS);
        SC.connect({ username: localStorage.getItem('username')}, function (frame) {
            SC.subscribe("/topic/sessionScheduler/"+eventID+"/chat", function (messageOutput) {
                parseMessageFromChat(messageOutput.body);
            });
            setSC(SC);
        });
    }, []);

    function parseMessageFromChat(body) {
        console.log(JSON.parse(body))
        fetchMessages()
    }


    const sendMessageServer = async () => {
        const requestBody = JSON.stringify({text});
        await apiLoggedIn().post(`/events/${eventID}/messages`, requestBody);
    }

    function sendMessageWS() {
        try{
            SC.send("/app/sessionScheduler/"+eventID+"/chat", JSON.stringify(
                JSON.stringify({value: "message sent"})));
        }
        catch (e) {
            console.log(e);
        }
    }

    function sendMessage(e) {
        e.preventDefault()
        if(text.length === 0)//dont do smth if the text is empty
                return;

        sendMessageServer();
        sendMessageWS();
        console.log(text);
        setText("");//set text to 0
    }

    function keyDownTextarea(e){
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            sendMessage(e)
        }
    }

    return(
        <>
        {showChat ?
        <section className="avenue-messenger">
            <div className="menu">
                <a href="#" title="Minimize" className={"button"} onClick={() => setShowChat(false)}>_</a>
            </div>
            <div className="agent-face">
                {/*<div className="half">*/}
                {/*    <img className="agent circle" src="http://askavenue.com/img/17.jpg" alt="Jesse Tino"/>*/}
                {/*</div>*/}
            </div>
            <div className="chat">
                <div className="chat-title">
                    <h1>Chat room</h1>

                </div>
                <div className="messages">
                    <div className="messages-content">
                        {messages.map((m) =>
                            <Message
                                key={m.datetime + "-" + m.username}
                                personal={m.userID === parseInt(localStorage.getItem('userId'))}
                                username={m.username}
                                text={m.text}
                                datetime={m.datetime}
                            />
                        )}
                    </div>
                </div>
                <div className="message-box">
                    <form onSubmit={(e) => sendMessage(e)}>
                        <textarea
                            className="message-input"
                            placeholder="Press Enter to send"
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={keyDownTextarea}
                            value={text}
                        />
                        <button type="submit" className="message-submit" onClick={(e) => sendMessage(e)}>Send</button>
                    </form>

                </div>
            </div>
        </section>
        :
            <div className={"show-chat"} onClick={() => setShowChat(true)}>
                <img src={chatIcon}/>
            </div>

        }
        </>


    )
}

export default ChatWindow