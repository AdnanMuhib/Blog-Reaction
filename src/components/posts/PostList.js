import React, { Component } from "react";
import NewPost from "../posts/NewPost";
import { Link } from "react-router-dom";
import "../../App.css";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
// import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3, 2)
//   }
// }));
// const classes = useStyles();
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem("posts"))
    };
    this.callback = this.callback.bind(this);
  }
  callback(event) {
    console.log("Call Back");
    this.setState({ posts: JSON.parse(localStorage.getItem("posts")) });
  }
  render() {
    const pageLayout = (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={3} />
          <Grid
            item
            xs={6}
            style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
          >
            {this.state.posts.map((postDetail, index) => {
              return (
                <div key={postDetail.id}>
                  <Paper className={"root"} square={false}>
                    {/* <Paper className={classes.root}> */}
                    <h3>
                      <Link
                        to={`/Blog-Reaction/post/${postDetail.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {postDetail.title}
                      </Link>
                    </h3>
                  </Paper>
                  <Divider />
                </div>
              );
            })}
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
