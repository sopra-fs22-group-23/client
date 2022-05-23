import React, {useState} from "react";
import {apiLoggedIn, handleError} from "../../../helpers/api";

const EmailPopup = (props) => {
    const [email, setEmail] = useState(null);
    const [popupState, setPopupState] = useState("email")

    const sendEmail = async () => {
        try {
            const requestBody = JSON.stringify({email});
            await apiLoggedIn().post(`/emailNotification/${props.event.id}`, requestBody);
            setPopupState("confirmation");
        } catch (error) {
            alert(`Something went wrong when sending the email: \n${handleError(error)}`);
        }
    }

    const emailPhase = (
        <div>
            <div className={"email-title"}>Interested in this Event?</div>
            <div className={"email-description"}>Enter your email below to receive updates and notifications:</div>
            <input
                className="email-input"
                type="text"
                placeholder="enter email..."
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button
                className={"email-button"}
                onClick={() => sendEmail()}
            >Send</button>
        </div>
    );

    const confirmationPhase = (
        <div>
            <div className={"confirmation-title"}>You're good to go!</div>
            <div className={"confirmation-content"}>Email has been sent. Check your inbox for the link to: </div>
            <div className={"confirmation-content"}>"{props.event.title}"</div>
        </div>
    );

    function chooseContent() {
        if(popupState === "confirmation"){
            return confirmationPhase;
        }
        return emailPhase;
    }

    return (
        <>{chooseContent()}</>
    )
}
export default EmailPopup;