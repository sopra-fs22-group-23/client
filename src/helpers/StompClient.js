import {getDomainWS} from "./getDomain";
import Stomp from "webstomp-client"

class StompClient{
    static instance;

    static getInstance() {
        if (!StompClient.instance) StompClient.instance = new StompClient();
        return StompClient.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect = (subscribeTopic, onMessage) => {
        var socket = new WebSocket(getDomainWS());
        this.socketRef = Stomp.over(socket);

        this.socketRef.connect({username: "adam"}, function(frame) {

            console.log('Connected: ' + frame);

            // this.socketRef.subscribe('/topic/sessionScheduler/aabbcc', function(messageOutput) {
            //     showMessageOutput(JSON.parse(messageOutput.body));
            // });

            this.socketRef.subscribe(subscribeTopic, function(messageOutput) {
                    console.log(JSON.parse(messageOutput.body));
                });

        });


    }
    disconnect() {

        if(this.socketRef != null) {
            this.socketRef.disconnect();

            //TODO add reconnect to same topic and
            // this.socketRef.connect()
        }
        console.log("Disconnected");
    }

    send(topic, smth, json){
        this.socketRef.send(topic, smth, json);
    }

}
export default StompClient.getInstance();










// function sendMessage() {
//
//     var from = document.getElementById('from').value;
//     var text = document.getElementById('text').value;
//     stompClient.send("/app/sessionScheduler/aabbcc", {}, JSON.stringify({'user':from, 'taskID':text, 'action': "LOCK"}));
// }

