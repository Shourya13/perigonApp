import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserCard from "../../Components/userCard/UserCard";

const Users = (props) => {
  const { users, isLoading } = props;

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

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
