import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// bootstrap Imports
import { Form, Row, Col, Button } from "react-bootstrap";
// Custom Imports
import { actions } from "../../actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.postId,
      name: "",
      message: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.props.addCommentRequest(this.state.id, "John Doe", this.state.message);
    this.setState({
      name: "",
      message: ""
    });
    event.preventDefault();
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row id="PaddingRow">
            <Col md={9}>
              <Form.Group controlId="comment">
                <Form.Control
                  as="textarea"
                  rows="10"
                  value={this.state.message}
                  onChange={this.handleChange("message")}
                  placeholder="Write your comment"
                />
              </Form.Group>
              <Form.Group className="CommentSubmit">
                <Button type="submit">Leave Your Comment</Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

const addCommentRequest = (postId, name, message) =>
  actions.addComment.request({ postId, name, message });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addCommentRequest }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
