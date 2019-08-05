import { all } from "redux-saga/effects";

import {
  getCommentsSaga,
  postCommentSaga,
  deleteCommentSaga
} from "./comments";

function* rootSaga() {
  yield all([getCommentsSaga(), postCommentSaga(), deleteCommentSaga()]);
}

export default rootSaga;
