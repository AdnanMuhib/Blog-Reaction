// React Imports
import React from "react";

// bootstrap imports
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Logo from "../../static/images/logo.png"
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log();
  }

  render() {
    return (
      <>
        <Container fluid id="modified-container">
          <div className="Logo">
            <Link to="/Blog-Reaction">
              <Image src={Logo} thumbnail className="img-responsive" />
            </Link>
          </div>
        </Container>
        <div className="dropdown-divider" />
      </>
    );
  }
}

export default Header;
