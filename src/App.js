import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersFetch } from "./features/userSlice/user.reducer";

import "./App.css";

const App = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersFetch());
    navigate("/users");
  }, []);

  return <></>;
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUsersFetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
