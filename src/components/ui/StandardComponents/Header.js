import React from "react";
import {Navbar} from "react-bootstrap";
import "../../../styles/views/Header.scss";
import {useNavigate} from "react-router";
import {apiLoggedIn, handleError} from "../../../helpers/api";
import user from "../../pictures/pic.png";
import logo from "../../pictures/Logo.png";

const Header = () => {
    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    const logout = async () => {
        try {
            await apiLoggedIn().put(`/logout/${userId}`);
            // Remove the token from the local storage.
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
            navigate("/");
        } catch (error) {
            alert(`Something went wrong during logout: \n${handleError(error)}`);
        }
    };

    function toggleContent() {
        return (
            <div>
                <div className={"hover"}>
                    <div>
                        <button className={"lg"} onClick={() => navigate("/user")}>Profile Settings</button>
                    </div>
                    <div>
                        <button className={"lg"} onClick={() => logout()}>Logout</button>
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
        return <></>
    }

    return (
        <Navbar className="color-nav">
            <div class="container-fluid">
                <a href="/home" className="navbar-brand">
                    <img src={logo} width={"230"} className={"mt-2"}></img></a>
                <div className={"mr-2 w-25"}>
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
