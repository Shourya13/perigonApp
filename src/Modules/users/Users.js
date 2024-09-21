import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { getUsersFetch } from "../../features/userSlice/user.reducer";

import UserCard from "../../Components/userCard/UserCard";

const Users = (props) => {
  const { users, isLoading } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsersFetch());
    }
  }, []);

  return (
    <div className="container">
      <section className="section">
        {isLoading ? (
          <p>Fetching user data...</p>
        ) : (
          <>
            <div className="user-list">
              <div className="columns is-gapless is-multiline">
                {users.map((user, index) => {
                  return (
                    <div key={index} className="column is-4">
                      <div className="m-2">
                        <UserCard data={user} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.root.user.users,
    isLoading: state.root.user.isLoading,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUsersFetch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Users);
