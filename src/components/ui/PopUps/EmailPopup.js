import React, {useCallback, useRef, useState} from "react";
import {apiLoggedIn, handleError} from "../../../helpers/api";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

const EmailPopup = (props) => {
    const [email, setEmail] = useState(null);
    const [popupState, setPopupState] = useState("email")

    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(200 * particleRatio)
        });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    const sendEmail = async () => {
        try {
            setPopupState("delivery");
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
                onClick={() => {sendEmail()}}
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
    const delivery = (
        <div>
            <div className={"confirmation-title"}>The email is on the way, please wait.....</div>
        </div>
    );

    function chooseContent() {
        if(popupState === "confirmation"){
            fire();
            return confirmationPhase;
        }
        if(popupState === "delivery")
            return delivery;

        return emailPhase;
    }

    return (
        <>
            {chooseContent()}
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </>
    )
}
export default EmailPopup;