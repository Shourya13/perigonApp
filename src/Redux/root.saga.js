import { all, fork } from "redux-saga/effects";

import userSaga from "../features/userSlice/user.saga";

function* rootSaga() {
  yield all([fork(userSaga)]);
}

export default rootSaga;
