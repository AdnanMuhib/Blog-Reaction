import React from "react";
import BlogAPI from "../../api/BlogAPI";

class PostView extends React.Component {
  API = new BlogAPI();
  postTitle = "";
  postBody = "";
  postTags = "";
  getPost = () => {
    this.API.getPost(this.props.id)
      .then(response => {
        this.postTitle = response.data.title;
        this.postBody = response.data.body;
        this.postTags = response.data.tags;
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        console.log();
      });
  };
  componentDidMount() {
    this.getPost();
  }

  componentWillUpdate() {
    this.getPost();
  }
  render() {
    return (
      <div>
        <h1>{this.postTitle}</h1>
        <br />
        <p>{this.postBody}</p>
        <br />
        <p>{this.postTags}</p>
      </div>
    );
  }
}
export default PostView;
