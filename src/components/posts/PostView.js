import React from "react";
import { Link } from "react-router-dom";

function PostView(data) {
  let PostData = JSON.parse(localStorage.getItem("posts"));
  let postTitle = null;
  let postContent = null;
  let postTag = null;
  console.log(data);
  let postId = data.match.params.id;
  for (var i = 0; i < PostData.length; i++) {
    if (PostData[i].id === parseInt(postId)) {
      postTitle = PostData[i].title;
      postContent = PostData[i].content;
      postTag = PostData[i].tags.join(", ");
      break;
    }
  }
  return (
    <div>
      <h2>
        <Link to={"/Blog-Reaction/posts"}>Back</Link>
      </h2>
      <h1>{postTitle}</h1>
      <p>{postContent}</p>
      <p>Tags: {postTag}</p>
    </div>
  );
}

export default PostView;
