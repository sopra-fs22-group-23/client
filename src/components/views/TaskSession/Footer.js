import "../../../styles/ui/Footer.scss";
import { React } from "react";
import "../../../styles/ui/EventOverview.scss";
import { useNavigate } from "react-router";
import { MyButton } from "../../ui/StandardComponents/MyButton";

const Footer = (props) => {
    const navigate = useNavigate();

    //BUG: disabled doesn't always work
    // const adminButton = (
    //     <button
    //         type="button"
    //         className="role-button"
    //         onClick={() => navigate(`/taskSession/${eventId}`)}
    //     >
    //         Start Session
    //     </button>
    // );
    //
    // const collaboratorButton = (
    //     <button
    //         className="role-button"
    //         onClick={() => navigate(`/taskSession/${eventId}`)}
    //     >
    //         Join Session
    //     </button>
    // );


    let content = (
        <div className="rectangle">
            <div className="infos-event">
                <button
                            type="button"
                            className="role-button"
                            style={{marginLeft:"20px"}}
                            onClick={() => navigate(`/event/${props.eventID}`)}
                        >
                    Back to event
                         </button>

                {/*<div className="date">*/}
                {/*    <div className="date-title">Date</div>*/}
                {/*    <div className="date-real">*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="time">*/}
                {/*    <div className="time-title">Time</div>*/}
                {/*    <div className="time-real">*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="location">*/}
                {/*    <div className="location-title">Location</div>*/}
                {/*    <div className="location-real"></div>*/}
                {/*</div>*/}
                {/*<MyButton className="role-button" onClick={() => navigate(`/home`)}>*/}
                {/*    Back*/}
                {/*</MyButton>*/}
            </div>
        </div>
    );

    return <>{content}</>;
};

export default Footer;
