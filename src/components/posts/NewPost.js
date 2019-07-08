import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
    content: "Controlled"
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
        id="content"
        label="Post Content"
        multiline
        rowsMax="4"
        value={values.multiline}
        onChange={handleChange("content")}
        className={classes.textField}
        margin="normal"
        helperText="Enter the Post content"
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
      <SubmitButton />
    </form>
  );
}
function SubmitButton() {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      className={classes.button}
    >
      Submit
    </Button>
  );
}

class NewPost extends React.Component {
  constructor(props) {
    console.log("I am constructor");
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem("posts")),
      updatePosts: props.callback
    };
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(event) {
    event.preventDefault();
    this.setState({
      posts: JSON.parse(localStorage.getItem("posts"))
    });
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let tags = document.getElementById("tags").value;
    let postData = {
      id: this.state.posts.length + 1,
      title: title,
      content: content,
      tags: tags.split(", ")
    };
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("tags").value = "";

    let updatedData = this.state.posts.concat(postData);
    localStorage.setItem("posts", JSON.stringify(updatedData));
    this.state.updatePosts();
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
