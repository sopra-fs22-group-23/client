import "../../../styles/taskSession/chat.scss"
import {useEffect, useRef, useState} from "react";
import Message from "./Message";
import {getDomainWS} from "../../../helpers/getDomain";
import Stomp from "webstomp-client";
import {apiLoggedIn} from "../../../helpers/api";
import chatIcon from "./icons8-chat-100.png"
import moment from "moment";

const ChatWindow = ({eventID}) => {

    const [text, setText] = useState("")
    const [showChat, setShowChat] = useState(true)
    const [messages, setMessages] = useState([])
    const [unreadMessages, setUnread] = useState(0)



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
        setUnread(0)//because we need to get the null from somewhere
        // let response;

        return () => {
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

    useEffect(()=> {scrollToBottom()},[showChat])

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    function parseMessageFromChat(body) {
        const data = JSON.parse(body)
        if(data.action === "message_sent") {
            setMessages(prevState => {
                return [...prevState, data.data]
            })
            // if (showChat === false) { the if is not working from some reason
                setUnread(prevState => {
                    return ++prevState
                })//set unread only if the chat is closed
            // }
        }


    }

    const sendMessageServer = async () => {
        const requestBody = JSON.stringify({text});
        await apiLoggedIn().post(`/events/${eventID}/messages`, requestBody);
    }

    function sendMessageWS() {
        try{
            SC.send("/app/sessionScheduler/"+eventID+"/chat",
                JSON.stringify(
                    {action: "message_sent", data:
                            {
                                userID: localStorage.getItem('userId'),
                                username: localStorage.getItem('username'),
                                "text": text,
                                datetime: moment(),
                                eventID: eventID,
                                id: 134


                            }
                    }
                    )
            );
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
                <a href="#" title="Minimize" className={"button"} onClick={() => {setShowChat(false);setUnread(0)}}>_</a>
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
                                personal={parseInt(m.userID) === parseInt(localStorage.getItem('userId'))}
                                username={m.username}
                                text={m.text}
                                datetime={m.datetime}
                            />
                        )}
                        <div style={{ float:"left", clear: "both" }} ref={messagesEndRef} />
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
            <div className={`show-chat ${unreadMessages > 0 && "bounce" }`} onClick={() => {setShowChat(true);setUnread(0);}}>
                <img src={chatIcon}/>

                {unreadMessages === 0 ?
                    <div>Open chat</div>
                    :
                    <div style={{color:"darkred"}}> {unreadMessages} New!</div>
                }


            </div>

        }
        </>


    )
}

export default ChatWindow