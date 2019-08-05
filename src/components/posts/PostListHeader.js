// react imports
import React from "react";
import PropTypes from "prop-types";

// frontend imports
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import SearchBar from "../search";
import EditImage from "../../static/images/edit-icon.png";

// router imports
import { Link } from "react-router-dom";

class PostListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSubmit: props.handleSubmit
    };
  }

  render() {
    return (
      <Container fluid id="modified-container">
        <Row>
          <Col className="mb-10">
            <Row>
              <Image src={EditImage} rounded />
              &nbsp;&nbsp;
              <h2>Posts</h2>&nbsp;&nbsp;
              <Link to="/posts/new">
                <Button>Add New</Button>
              </Link>
            </Row>
          </Col>
          <Col md={6} />
          <Col>
            <SearchBar handleSubmit={this.state.handleSubmit} />
          </Col>
        </Row>
      </Container>
    );
  }
}

PostListHeader.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default PostListHeader;
