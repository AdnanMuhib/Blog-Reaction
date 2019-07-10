import axios from "axios";

class BlogAPI {
  //    Default Settings for the API Base URl
  axiosInstance = axios.create({
    baseURL: "http://5d1b60a5dd81710014e886c4.mockapi.io/api/v1",
    timeout: 10000
  });

  // get single post based on provided ID
  getPost = id => {
    return this.axiosInstance.get("/posts/" + id);
  };

  //   Get all posts from the API Call
  getPosts = () => {
    return this.axiosInstance.get("/posts");
  };

  // New post submit to API
  submitPost = postData => {
    return this.axiosInstance.post("/posts", {
      title: postData.title,
      body: postData.body,
      tags: postData.tags
    });
  };

  // Update the Existing Post
  updatePost = (id, postData) => {
    return this.axiosInstance.put('/posts/' + id,{
      title:postData.title,
      body:postData.body,
      tags: postData.tags
    })
  }

  // Delete the Exsiting Post
  deletePost = (id) => {
    return this.axiosInstance.delete('/posts/' + id)
  }
}

export default BlogAPI;
