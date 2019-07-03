import React from "react";
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
        <form onSubmit={this.formSubmitHandler}>
          <div>
            <input type="text" id="title" placeholder="Enter Post Title" />
          </div>
          <br />
          <div>
            <textarea type="text" id="content" placeholder="Enter Content" />
          </div>
          <br />
          <div>
            <input type="text" id="tags" placeholder="Enter Post Tags" />
          </div>
          <br />
          <div>
            <input type="submit" value="Add post" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;
