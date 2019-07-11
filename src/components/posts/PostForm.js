// React Imports
import React from "react";
import PropTypes from "prop-types";

// Material UI Imports
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// React Router Imports
import { Redirect, Link } from "react-router-dom";

// Custom Imports
import BlogAPI from "../../services/BlogAPI";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  dense: {
    marginTop: theme.spacing(2)
  }
});
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

  API = new BlogAPI();
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
    this.API.getPost(this.state.postId).then(response => {
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
    this.API.submitPost(postData)
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
    this.API.updatePost(this.state.postId, postData)
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
    const { classes } = this.props;
    if (this.state.redirect === true) {
      return <Redirect to="/posts" push />;
    } else {
      let submitButton = (
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      );
      if (this.state.updateMode === true) {
        submitButton = (
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        );
      }
      return (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Link to="/Blog-Reaction/posts">
              <Button variant="contained" color="secondary" size="medium">
                Back to Posts
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <form
              className={classes.container}
              onSubmit={this.handleFormSubmit}
            >
              <TextField
                id="title"
                label="Post Title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
              />
              <br />
              <TextField
                id="body"
                label="Post body"
                multiline
                rowsMax="4"
                value={this.state.body}
                onChange={this.handleChange("body")}
                className={classes.textField}
                margin="normal"
                helperText="Enter the Post body"
                variant="outlined"
              />
              <br />
              <TextField
                id="tags"
                label="Post Tags"
                className={classes.textField}
                value={this.state.tags}
                onChange={this.handleChange("tags")}
                margin="normal"
                variant="outlined"
              />
              <br />
              {submitButton}
            </form>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      );
    }
  }
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostForm);
