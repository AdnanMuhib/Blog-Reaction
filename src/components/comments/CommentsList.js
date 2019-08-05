import React from "react";
import PropTypes from "prop-types";

// Redux imports
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Bootstrap Imports
import { Media, ListGroup } from "react-bootstrap";

// Custom Imports
import { actions } from "../../actions";
import UserImage from "../../static/images/user.png";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.postId
    };
  }

  getComments = () => {
    this.props.getCommentsRequest({ postId: this.state.id });
  };

  handleDelete = commentId => {
    this.props.deleteCommentRequest({ postId: this.state.id, commentId });
  };

  componentDidMount() {
    this.getComments();
  }
  // unix timestamp to date format
  getFormattedDate = date => {
    let DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    let commentDate = new Date(date * 1000);
    let formattedDate = commentDate
      .toLocaleDateString("en-GB", DATE_OPTIONS)
      .toString();
    return formattedDate;
  };
  render() {
    return (
      <>
        <ListGroup>
          {this.props.comments.map(comment => (
            <div key={comment.id}>
              <Media as="li">
                <img
                  src={UserImage}
                  className="mr-3 roundedCircle"
                  alt="user profile"
                  width={64}
                  height={64}
                />
                <Media.Body>
                  <h5 className="CommentUser">{comment.name}</h5>
                  <p className="CommentDate">
                    {this.getFormattedDate(comment.createdAt)}
                  </p>
                  <p className="CommentMessage">{comment.message}</p>
                  <p>
                    <span
                      onClick={() => this.handleDelete(comment.id)}
                      className="MockLink"
                    >
                      Delete
                    </span>
                  </p>
                </Media.Body>
              </Media>
              <div className="dropdown-divider" />
            </div>
          ))}
        </ListGroup>
      </>
    );
  }
}

CommentsList.propTypes = {
  postId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    comments: state.commentsReducer.comments
  };
}

const getCommentsRequest = payload => actions.getComment.request(payload);

const deleteCommentRequest = (postId, commentId) =>
  actions.deleteComment.request(postId, commentId);

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommentsRequest,
      deleteCommentRequest
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);
