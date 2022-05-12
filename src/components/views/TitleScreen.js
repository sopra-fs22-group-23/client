import React from "react";
import "../../styles/views/Landing.scss"
import bg from "../pictures/title-bg.mp4"

const TitleScreen = () => {
    return (
        <div className={"title-screen"}>
            <div className={"border-container"}>WeVent</div>
            <video autoPlay loop muted className={"bg-video"}>
                <source src={bg} type={"video/mp4"}/>
            </video>
        </div>
    );
}
export default TitleScreen;