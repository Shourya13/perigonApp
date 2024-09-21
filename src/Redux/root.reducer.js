import { combineReducers } from "redux";

import userReducer from "../features/userSlice/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
