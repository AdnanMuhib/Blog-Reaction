import axios from "axios";
import { BASE_URL } from "../constants";

//    Default Settings for the API Base URl
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});
let CancelToken = axios.CancelToken;
let cancel;

const BlogAPI = {
  // get single post based on provided ID
  getPost: id => {
    return axiosInstance.get(`/posts/${id}`);
  },

  //   Get all posts from the API Call
  getPosts: () => {
    return axiosInstance.get("/posts");
  },

  // get Paginated Posts
  getPaginatedPosts: (pageNumber, limit = 5) => {
    return axiosInstance.get(`/posts/?page=${pageNumber}&limit=${limit}`);
  },

  // New post submit to API
  submitPost: postData => {
    return axiosInstance.post("/posts", {
      title: postData.title,
      body: postData.body,
      tags: postData.tags
    });
  },

  // Update the Existing Post
  updatePost: (id, postData) => {
    return axiosInstance.put(`/posts/${id}`, {
      title: postData.title,
      body: postData.body,
      tags: postData.tags
    });
  },

  // Delete the Exsiting Post
  deletePost: id => {
    return axiosInstance.delete(`/posts/${id}`);
  },

  // Get Likes of a Post
  getLikes: id => {
    return axiosInstance.get(`/posts/${id}/likes`);
  },

  // Submit new Like Method:Post
  submitLike: id => {
    return axiosInstance.post(`/posts/${id}/likes`);
  },

  // Delete a Like
  deleteLike: (postId, likeId) => {
    return axiosInstance.delete(`/posts/${postId}/likes/${likeId}`);
  },

  // get all comments of a post
  getComments: postId => {
    return axiosInstance.get(`/posts/${postId}/comments?sortBy=createdAt&order=desc`);
  },

  // get single comment of a post
  getComment: (postId, commentId) => {
    return axiosInstance.get(`/posts/${postId}/comments/${commentId}`);
  },

  // submit new comment on a post
  submitComment: payload => {
    return axiosInstance.post(`/posts/${payload.postId}/comments`, {
      name: payload.name,
      message: payload.message
    });
  },

  // Delete a comment of a post
  deleteComment: payload => {
    return axiosInstance.delete(
      `/posts/${payload.postId}/comments/${payload.commentId}`
    );
  },

  // Search Blog Posts using Keyword
  searchPosts: keyword => {
    if (cancel !== undefined) {
      cancel();
    }
    return axiosInstance.get(`/posts?search=${keyword}`, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
    });
  },

  // Get Sorted Blog Posts
  sortPosts: (key, order) => {
    return axiosInstance.get(`/posts?sortBy=${key}&order=${order}`);
  }
};

export default BlogAPI;
