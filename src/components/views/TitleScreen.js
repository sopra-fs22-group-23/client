import React, {useState} from "react";
import "../../styles/views/Landing.scss"
import bg from "../pictures/new.mp4"
import logo from "../pictures/LogoCut.png";
import arrow from "../pictures/right-arrow.png";
import {useNavigate} from "react-router";
import Login from "./Login/Login";
import {MyButton} from "../ui/StandardComponents/MyButton";

const TitleScreen = () => {
    const navigate = useNavigate();
    const [loginRegister, setLoginRegister] = useState(
        <div>
            <Login/>
        </div>
    );
    return (
        <div className={"title-screen"}>
            <div className={"op-container"}></div>
            <div className={"border-container"}></div>
            <div className={"login-container"}>
                {loginRegister}
            </div>
            <div className={"scroll-btn"}>
                <button
                    className={"float-end"}
                    onClick={() => window.scroll(3000, 0)}
                ><img src={arrow} className={"scroll-img"}/></button>
            </div>

            {/*<div className={"title-buttons"}>
                <Button
                    onClick={() => navigate("/login")}>Login/Register</Button>
                <Button
                    className={"float-end"}
                    onClick={() => window.scroll(3000, 0)}
                >Browse</Button>
            </div>*/}
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