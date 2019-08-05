import { createAsyncActions } from "../utils";

const addComment = createAsyncActions("ADD_COMMENT");
const getComment = createAsyncActions("GET_COMMENTS");
const deleteComment = createAsyncActions("DELETE_COMMENT");

export const actions = {
  addComment: addComment,
  getComment: getComment,
  deleteComment: deleteComment
};
