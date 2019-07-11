// React Imports
import React from "react";
import PropTypes from "prop-types";

// Material UI Import
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import BlogAPI from "../../services/BlogAPI";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      post: {},
      loading: true,
      error: false,
      errorMSG: ""
    };
  }

  API = new BlogAPI();

  getPost = () => {
    this.setState({
      loading: true
    });
    this.API.getPost(this.state.id)
      .then(response => {
        this.setState({
          post: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
          errorMSG: error
        });
      })
      .finally(() => {
        console.log();
      });
  };

  componentDidMount() {
    this.getPost();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getPost();
    }
  }

  render() {
    const { classes } = this.props;
    let data = "";
    if (this.state.loading === true) {
      data = <CircularProgress />;
    } else if (this.state.error === true) {
      data = (
        <div>
          Something Went Wrong
          <p style={{ color: "red" }}>{this.state.errorMSG}</p>
        </div>
      );
    } else {
      data = (<Grid container spacing={3}>
      <Grid item xs={3}>
        <Link to="/Blog-Reaction/posts">
          <Button variant="contained" color="primary">
            Back to Posts
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.state.post.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {this.state.post.tags}
            </Typography>
            <Typography variant="body2" component="p">
              {this.state.post.body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="inherit">
              share
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3} />
    </Grid>)
    }
    return data
  }
}
PostView.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PostView);
