import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Icon from "@material-ui/core/Icon";
// import Fab from '@material-ui/core/Fab';
// import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

import PostView from "./PostView";
import BlogAPI from "../../api/BlogAPI";
import NewPost from "../posts/NewPost";
import "../../App.css";

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: false,
      errorMSG: "",
      selectedPost: 6
    };
  }

  API = new BlogAPI();

  updatePostsState = () => {
    this.setState({
      loading: true
    });
    this.API.getPosts()
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          errorMSG: error
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };
  componentDidMount() {
    this.updatePostsState();
  }
  // classes = useStyles();
  callback = event => {
    this.updatePostsState();
  };

  setSelectedPost = postID => {
    this.setState({
      selectedPost: postID
    });
    console.log("Selected Post: " + this.state.selectedPost);
  };

  render() {
    // let  { classes } = this.props;
    let data;
    if (this.state.loading === true) {
      data = "LOADING....";
    } else if (this.state.error === true) {
      data = this.state.errorMSG;
    } else {
      data = this.state.posts.map((postDetail, index) => {
        return (
          <div key={postDetail.id}>
            <Paper className={"root"} square={false}>
              {/* <Paper className={this.classes.root}> */}
              <h3>
                <Link
                  to={`/Blog-Reaction/post/${postDetail.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => this.setSelectedPost(postDetail.id)}
                >
                  {postDetail.title}
                </Link>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                >
                  Delete
                </Button> */}
                <DeleteIcon style={{color:'white', backgroundColor:'red'}}/>
              </h3>
            </Paper>
            <Divider />
          </div>
        );
      });
    }
    let pageLayout = (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <PostView id={this.state.selectedPost} />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ backgroundColor: "#cfe8fc", height: "auto" }}
          >
            {data}
          </Grid>
          <Grid item xs={3}>
            <NewPost callback={this.callback} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
    return <div>{pageLayout}</div>;
  }
}

export default PostList;
