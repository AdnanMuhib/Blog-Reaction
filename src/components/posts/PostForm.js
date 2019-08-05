// React Imports
import React from "react";

// Material UI Imports
import AddIcon from "@material-ui/icons/Add";

// Bootsrap Imports
import { Form, Container, Row, Col, Button, InputGroup } from "react-bootstrap";

// React Router Imports
import { Redirect, Link } from "react-router-dom";

// Custom Imports
import API from "../../services/blogAPI";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.match.params.id,
      updateMode: true,
      title: "",
      tags: "",
      body: "",
      redirect: false
    };
  }

  state = {
    title: "",
    tags: "",
    body: "",
    redirect: false
  };

  componentDidMount() {
    if (this.props.match.params.id === undefined) {
      this.setState({
        updateMode: false
      });
    }
    if (this.state.postId !== undefined) {
      this.getExistingPost();
    }
  }
  // handle the change in input fields of the Form and
  // set the values to States for Controlled Component
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // If form is in Update mode then data of existing
  // post needs to be fetched and filled in form
  getExistingPost = () => {
    API.getPost(this.state.postId).then(response => {
      let post = response.data;
      this.setState({
        title: post.title,
        body: post.body,
        tags: post.tags
      });
    });
  };

  // Submission of newly Created Post
  submitNewPost = postData => {
    API.submitPost(postData)
      .then(response => {})
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          redirect: true
        });
      });
  };

  // Submission of Existing Post with Updated Data
  updateExistingPost = postData => {
    API.updatePost(this.state.postId, postData)
      .then(response => {})
      .catch(errors => {
        console.log(errors);
      })
      .finally(() => {
        this.setState({
          redirect: true
        });
      });
  };

  // handle the submission of new or updated post
  handleFormSubmit = event => {
    event.preventDefault();
    let postData = {
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags
    };
    if (this.state.updateMode === true) {
      this.updateExistingPost(postData);
    } else {
      this.submitNewPost(postData);
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/posts" push />;
    } else {
      let submitButton = (
        <Button block type="submit">
          Publish
        </Button>
      );
      if (this.state.updateMode === true) {
        submitButton = (
          <Button block type="submit">
            Update
          </Button>
        );
      }
      return (
        <Container fluid>
          <h1>{this.state.updateMode ? 'Edit Post':'Add New Post'}</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Row>
              <Col md={9}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter post title here"
                    value={this.state.title}
                    onChange={this.handleChange("title")}
                  />
                </Form.Group>
                <Form.Group controlId="postBody">
                  <Form.Control
                    as="textarea"
                    rows="10"
                    value={this.state.body}
                    onChange={this.handleChange("body")}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <div id="tagsInput">
                <Form.Label id="">Post Tags</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={this.state.tags}
                    onChange={this.handleChange("tags")}
                    autoComplete="off"
                    aria-describedby="inputGroupPrepend1"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend1" >
                      <AddIcon />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
                <Form.Text>Seperate Tags with commas</Form.Text>
                <br />
                <br />
                <Form.Group controlId="formBasicEmail">
                  {submitButton}
                </Form.Group>
                </div>
              </Col>
              
            </Row>
          </Form>
          <Link to="/Blog-Reaction/posts">
            <Button>Back to Posts</Button>
          </Link>
        </Container>
      );
    }
  }
}

export default PostForm;
