import { useNavigate } from "react-router-dom";

import userPlaceholderImg from "../../Assets/images/user-placeholder.png";

import "./userCard.scss";

const UserCard = (props) => {
  const { data } = props;

  const navigate = useNavigate();

  return (
    <div
      className="user-card p-3"
      onClick={() => navigate(`/editUser/${data.id}`)}
    >
      <div className="columns is-gapless">
        <div className="column is-flex is-3">
          <div className="is-flex is-justify-content-center is-align-items-center m-2">
            <img
              src={data.img ? data.img : userPlaceholderImg}
              className="user-img"
              alt="user-image"
            />
          </div>
        </div>
        <div className="column">
          <div className="user-details is-flex is-flex-direction-column m-2">
            <p className="user-name has-text-weight-bold is-size-5">
              {data.name}
            </p>
            <p className="user-email is-size-7">{data.email}</p>
            {data.address.suite && data.address.street && data.address.city && (
              <div className="user-addr is-size-6">{`${data.address.suite}, ${data.address.street}, ${data.address.city}`}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
