// React Imports
import React from "react";

// Material UI Import
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
// import { Link } from "react-router-dom";

// bootstrap imports
import { Container, Row, Button, Card } from "react-bootstrap";

// Custom Imports
import API from "../../services/blogAPI";
import CommentsList from "../comments/CommentsList";
import CommentForm from "../comments/CommentForm";
import { isPostLiked, toggleLike } from "../../utils";
// import BgImage from "../../static/images/post-bg.jpg";

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      post: {},
      like: 0,
      totalLikes: 0,
      loading: true,
      error: false,
      errorMSG: ""
    };
  }

  getPost = () => {
    this.setState({
      loading: true
    });
    API.getPost(this.state.id)
      .then(response => {
        this.setState({
          post: response.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true,
          errorMSG: error.message
        });
      });
  };

  getLikes = () => {
    try {
      // local storage check
      if (isPostLiked(this.state.id)) {
        this.setState({
          like: 1
        });
      } else {
        this.setState({
          like: 0
        });
      }

      // API update
      API.getLikes(this.state.id).then(response => {
        let likes = response.data;
        this.setState({
          totalLikes: likes.length
        });
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
        errorMSG: error.message
      });
    }
  };
  componentDidMount() {
    this.getPost();
    this.getLikes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getPost();
      this.getLikes();
    }
  }

  handleLike = () => {
    toggleLike(this.state.id);
    if (isPostLiked(this.state.id)) {
      API.submitLike(this.state.id)
        .catch(errors => {
          this.setState({
            loading: false,
            error: true,
            errorMSG: errors.message
          });
        })
        .finally(() => {
          this.getLikes();
        });
    } else {
      let likes = [];
      let likeId = 0;
      API.getLikes(this.state.id)
        .then(response => {
          likes = response.data;
        })
        .catch(errors => {
          this.setState({
            loading: false,
            error: true,
            errorMSG: errors.message
          });
        })
        .finally(() => {
          if (likes.length > 0) {
            likeId = likes[0].id;
            API.deleteLike(this.state.id, likeId);
          }
          this.getLikes();
        });
    }
  };

  render() {
    let likeButton = (
      <>
        <Button variant="success" onClick={this.handleLike}>
          <ThumbDown className="White" />
          &nbsp;{this.state.totalLikes}
        </Button>
      </>
    );

    if (this.state.like === 0) {
      likeButton = (
        <>
          <Button variant="danger" onClick={this.handleLike}>
            <ThumbUp className="White" />
            &nbsp;{this.state.totalLikes}
          </Button>
        </>
      );
    }

    let data = "";
    if (this.state.loading === true) {
      data = (
        <div className="Center">
          <CircularProgress />
        </div>
      );
    } else if (this.state.error === true) {
      data = (
        <div className="Center">
          Something Went Wrong
          <p className="Red">{this.state.errorMSG}</p>
        </div>
      );
    } else {
      data = (
        <>
          <Container fluid>
            <Row>
              <Card className="bg-dark text-white">
                <Card.Img
                  src="../../images/post-bg.jpg"
                  alt="Post Feature image"
                />
                <Card.ImgOverlay id="Overlay">
                  <Card.Title as="h1" className="PostViewTitle">
                    {this.state.post.title}
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Row>
          </Container>
          <br />
          <Container id="modified-container">
            <Row>{this.state.post.body}</Row>
            <Row id="PaddingRow">
              <div className="LikeButton">{likeButton}</div>
            </Row>
            <CommentForm postId={this.state.id} />
            <Row id="PaddingRow">
              <CommentsList postId={this.state.id} />
            </Row>
          </Container>
        </>
      );
    }
    return data;
  }
}
export default PostView;
