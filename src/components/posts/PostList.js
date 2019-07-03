import React, { Component } from "react";
import NewPost from "../posts/NewPost";
import { Link } from "react-router-dom";

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
    return (
      <div>
        <h1>Blog Posts</h1>
        <Link to="/Blog-Reaction/home">Home</Link>
        {this.state.posts.map((postDetail, index) => {
          return (
            <div key={postDetail.id}>
              <Link to={`/Blog-Reaction/post/${postDetail.id}`}>
                {postDetail.title}
              </Link>
            </div>
          );
        })}
        <NewPost callback={this.callback} />
      </div>
    );
  }
}

export default PostList;
