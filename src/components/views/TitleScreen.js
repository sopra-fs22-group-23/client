import React from "react";
import "../../styles/views/Landing.scss"
import bg from "../pictures/title-bg.mp4"
import logo from "../pictures/LogoCut.png"
import {Button} from "react-bootstrap";

const TitleScreen = () => {
    return (
        <div className={"title-screen"}>
            <div className={"op-container"}></div>
            <div className={"border-container"}></div>
            <div className={"title-buttons"}>
                <Button>Login/Register</Button>
                <Button className={"float-end"}>Browse</Button>
            </div>
            <div className={"logo-container"}>
                <div className={"circle-three"}>
                    <div className={"circle-two"}>
                        <div className={"circle-one"}>
                            <img src={logo} className={"title-logo"}/>
                        </div>
                    </div>
                </div>
            </div>
            <video autoPlay loop muted className={"bg-video"}>
                <source src={bg} type={"video/mp4"}/>
            </video>
        </div>
    );
}
export default TitleScreen;