import React from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../../styles/views/Header.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="color-nav">
      <div class="container-fluid">
        <span class="navbar-brand" onClick={navigate("/home")}>
          WeVent
        </span>
      </div>
    </Navbar>
  );
};

export default Header;
