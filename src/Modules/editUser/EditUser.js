import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { toast } from "react-toastify";

import {
  getUsersFetch,
  updateUser,
} from "../../features/userSlice/user.reducer";

const errToastOptions = {
  position: "bottom-right",
  pauseOnHover: true,
  type: "error",
};

const EditUser = (props) => {
  const { users, isLoading, updateUser } = props;
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [index, setIndex] = useState();

  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getUsersFetch());
  // }, [dispatch, getUsersFetch]);

  useEffect(() => {
    if (!isLoading && users.length > 0 && id) {
      const userIndex = users.findIndex((user) => user.id == id);
      setIndex(userIndex);
      setData(users[userIndex]);
    }
  }, [users, isLoading, id]);

  const validate = () => {
    const newErrors = [];

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 3) {
      newErrors.push("Name must be at least 3 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors("Invalid email format");
    }

    if (
      !data.address.suite.trim() &&
      !data.address.street.trim() &&
      !data.address.city.trim()
    ) {
      newErrors("Address is required");
    }

    setErrors(newErrors);
  };

  return (
    <div className="container">
      <section className="section">
        {isLoading ? (
          <p>Fetching user data...</p>
        ) : (
          <div className="box">
            <h3 className="title is-3 has-text-weight-bold">Edit User</h3>
            {data && (
              <>
                <div className="columns is-gapless is-multiline">
                  <div className="column is-6">
                    <div className="mx-2">
                      <label htmlFor="name" className="is-flex label is-5">
                        Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        className="input"
                        onChange={(e) =>
                          setData({
                            ...data,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="mx-2">
                      <label htmlFor="email" className="is-flex label is-5">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        className="input"
                        onChange={(e) =>
                          setData({
                            ...data,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="column">
                    <div className="m-2 my-3">
                      <label htmlFor="addr" className="is-flex label is-5 mb-0">
                        Address:
                      </label>
                      <div id="addr" className="columns is-gapless">
                        <div className="column is-4">
                          <div className="m-2">
                            <label
                              htmlFor="suite"
                              className="is-flex label is-size-7"
                            >
                              Suite:
                            </label>
                            <input
                              id="suite"
                              type="text"
                              placeholder="Suite"
                              value={data.address.suite}
                              className="input"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  address: {
                                    ...data.address,
                                    suite: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="column is-4">
                          <div className="m-2">
                            <label
                              htmlFor="street"
                              className="is-flex label is-size-7"
                            >
                              Street:
                            </label>
                            <input
                              id="stret"
                              type="text"
                              placeholder="Street"
                              value={data.address.street}
                              className="input"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  address: {
                                    ...data.address,
                                    street: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="column is-4">
                          <div className="m-2">
                            <label
                              htmlFor="city"
                              className="is-flex label is-size-7"
                            >
                              City:
                            </label>
                            <input
                              id="city"
                              type="text"
                              placeholder="City"
                              value={data.address.city}
                              className="input"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  address: {
                                    ...data.address,
                                    city: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="button is-primary"
                  onClick={() => {
                    validate();
                    if (errors.length > 0) {
                      errors.forEach((error) => toast(error), errToastOptions);
                    }
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </div>
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
  bindActionCreators({ getUsersFetch, updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
