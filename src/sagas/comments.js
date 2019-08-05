// redux saga imports
import { put, call, take } from "redux-saga/effects";

// custom imports
import API from "../../src/services/blogAPI"
import {actions} from "../../src/actions"
import {
  GET_COMMENTS_REQUEST,
  ADD_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST
} from "../constants/actionTypes";

export function* getCommentsSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_COMMENTS_REQUEST);
      const { data } = yield call(API.getComments, payload.postId);
      yield put(actions.getComment.success({ postId: payload.postId, data }));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* postCommentSaga() {
  while (true) {
    try {
      const { payload } = yield take(ADD_COMMENT_REQUEST);
      const { data } = yield call(API.submitComment, payload);
      yield put(actions.addComment.success({ data }));
    } catch (error) {
      yield put(actions.addComment.failure({ error: error }));
    }
  }
}

export function* deleteCommentSaga() {
  while (true) {
    try {
      const { payload } = yield take(DELETE_COMMENT_REQUEST);
      yield call(API.deleteComment, payload);
      yield put(actions.deleteComment.success({}));

      yield put(actions.getComment.request({ postId: payload.postId }));
    } catch (error) {
      yield put(actions.deleteComment.failure({ error: error }));
    }
  }
}
