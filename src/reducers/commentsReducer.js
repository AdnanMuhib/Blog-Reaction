import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
} from "../constants/actionTypes";
const initialState = {
  comments: [],
  id: 0,
  message: "",
  name: ""
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Post New Comment
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        id: action.payload.postId,
        message: action.payload.message,
        name: action.payload.name,
        loading: true
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [action.payload.data, ...state.comments]
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.error
      };
    // Get all Comments
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        id: action.payload.postId,
        comments: []
      };

    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.payload.postId,
        comments: action.payload.data
      };

    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.error
      };
    // Delete Single Comment
    case DELETE_COMMENT_REQUEST:
      
      return {
        ...state,
        // loading: true
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        // loading: false
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.error
      };

    default:
      return state;
  }
};

export default commentsReducer;
