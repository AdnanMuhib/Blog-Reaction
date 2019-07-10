import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BlogAPI from "../../api/BlogAPI";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

function NewPostForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title: "Cat in the Hat",
    tags: "",
    body: "Controlled"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <form className={classes.container} onSubmit={props.formSubmitHandler}>
      <TextField
        id="title"
        label="Post Title"
        className={classes.textField}
        value={values.name}
        onChange={handleChange("title")}
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        id="body"
        label="Post body"
        multiline
        rowsMax="4"
        value={values.multiline}
        onChange={handleChange("body")}
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
        value={values.name}
        onChange={handleChange("tags")}
        margin="normal"
        variant="outlined"
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

class NewPost extends React.Component {
  API = new BlogAPI();
  constructor(props) {
    super(props);
    this.state = {
      updatePosts: props.callback
    };
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(event) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let tags = document.getElementById("tags").value;

    let postData = {
      title: title,
      body: content,
      tags: tags.split(", ")
    };
    this.API.submitPost(postData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.state.updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        document.getElementById("tags").value = "";
      });
  }
  render() {
    return (
      <div>
        <h2>Add New Post</h2>
        <br />
        <NewPostForm formSubmitHandler={this.formSubmitHandler} />
      </div>
    );
  }
}

export default NewPost;
