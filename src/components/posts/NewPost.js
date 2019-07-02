import React from "react";
import PostData from "../../data/posts.json";
class NewPost extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  formSubmitHandler(event) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let tags = document.getElementById("tags").value;
    let postData = {
      id: PostData.length + 1,
      title: title,
      content: content,
      tags: tags.split(", ")
    };
    // console.log(postData);
    let updatedData = PostData.concat(postData);
    console.log(updatedData);
  }
  render() {
    return (
      <div>
        <h2>Enter Post Details</h2>
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
