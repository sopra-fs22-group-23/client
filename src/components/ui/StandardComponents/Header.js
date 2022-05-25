import React from "react";
import {Navbar} from "react-bootstrap";
import "../../../styles/views/Header.scss";
import {useNavigate} from "react-router";
import {apiLoggedIn, handleError} from "../../../helpers/api";
import user from "../../pictures/pic.png";
import logo from "../../pictures/Logo.png";
import out from "../../pictures/logout.png";
import login from "../../pictures/previous.png";
import settings from "../../pictures/settings.png";
import {getDomain} from "../../../helpers/getDomain";
import pic from "../../pictures/badic.png";

const Header = (props) => {
    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    const logout = async () => {
        try {
            await apiLoggedIn().put(`/logout/${userId}`);
        } catch (error) {
            alert(`You are logged on another computer, but we still log you out.`);
        }
        // Clear localstorage, no matter what happens
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        navigate("/");
    };

    function toggleContent() {
        return (
            <div>
                <div className={"hover"}>
                    <div>
                        <button className={"lg"} onClick={() => navigate("/profile")}>Profile<img className={"nav-icons"} src={settings}/></button>
                    </div>
                    <div>
                        <button className={"lg"} onClick={() => logout()}>Logout<img className={"nav-icons"} src={out}/></button>
                    </div>
                </div>

            </div>
        );
    }

    function chooseButtons() {
        if (userId) {
            return (
                <ul className={"navbar-nav"}>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/browse">Public Events</a>
                    </li>
                    <li className="nav-item">
                        <Toggler text={toggleContent()}></Toggler>
                    </li>
                </ul>
            )
        }
        if(props.location === "EventOverview"){
            return (
                <button
                    className={"button-scroll-login"}
                    onClick={() => navigate("/")}
                >Login  <img src={getDomain() + "/users/" + localStorage.getItem("userId") + "/image"} className={"login-icon"}
                             onError={({ currentTarget }) => {
                                 currentTarget.onerror = null; // prevents looping
                                 currentTarget.src=login;
                             }}/>
                </button>
            );
        }
        return (
            <button
                className={"button-scroll-login"}
                onClick={() => window.scroll(-3000, 0)}
            >Login  <img className={"login-icon"} src={login}/>
            </button>
        );
    }

    function nav() {
        if(userId){
            navigate("/home");
        } else {
            navigate("/")
        }
    }

    return (
        <Navbar className="color-nav">
            <div class="container-fluid">
                <button
                    className={"navbar-brand"}
                    onClick={() => nav()}>
                    <img src={logo} width={"230"} className={"mt-2"}></img>
                </button>
                <div className={"nav-container"}>
                    <div>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {chooseButtons()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

class Toggler extends React.Component {

    state = {
        textflag: true,
    }

    ToggleButton() {
        this.setState(
            {textflag: !this.state.textflag}
        );
    }

    render() {
        return (
            <div>
                <button onClick={() => this.ToggleButton()}>
                    <img src={user} className={"profile-image"}/>
                </button>
                {!this.state.textflag && this.props.text}
            </div>
        )
    }
}

export default Header;
