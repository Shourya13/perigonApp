import { call, put, takeEvery } from "redux-saga/effects";
import { getUsersSuccess, getUsersFailure } from "./user.reducer";

import RepositoryFactory from "../../DataLayer/repositories/RepositoryFactory";

function* workGetUsersFetch() {
  try {
    const userFactory = RepositoryFactory.get("user");
    const Users = yield call(userFactory.getUsers);

    yield put(getUsersSuccess(Users));
  } catch (e) {
    console.error(e);
    yield put(getUsersFailure(e));
  }
}

function* userSaga() {
  yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

export default userSaga;
