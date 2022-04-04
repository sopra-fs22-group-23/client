import React from "react";
import { Navbar } from "react-bootstrap";
import "../../styles/views/Header.scss";

const Header = () => {
  return (
    <Navbar className="color-nav">
      <div class="container-fluid">
        <a class="navbar-brand" href="home">
          WeVent
        </a>
      </div>
    </Navbar>
  );
};

export default Header;
