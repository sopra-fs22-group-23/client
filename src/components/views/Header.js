import React from "react";
import { Navbar } from "react-bootstrap";
import "../../styles/views/Header.scss";
import {useNavigate} from "react-router";
import {apiLoggedIn, handleError} from "../../helpers/api";
import {MyButton} from "../ui/MyButton";

const Header = () => {

    const navigate = useNavigate();
    let userId = localStorage.getItem('userId');

    const logout = async () => {
        try {
            await apiLoggedIn().put(`/logout/${userId}`);
            // Remove the token from the local storage.
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');

        } catch (error) {
            alert(`Something went wrong during logout: \n${handleError(error)}`);
        }
    };

  return (
    <Navbar className="color-nav">
      <div class="container-fluid">
        <a class="navbar-brand" href="home">
          WeVent
        </a>
        <MyButton
            onClick={() => logout()}>Logout
        </MyButton>
      </div>
    </Navbar>
  );
};

export default Header;
