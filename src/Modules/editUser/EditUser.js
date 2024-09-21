import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { toast } from "react-toastify";

import {
  getUsersFetch,
  updateUser,
} from "../../features/userSlice/user.reducer";
import ImageUpload from "../../Components/imageUpload/ImageUpload";

import userPlaceholderImg from "../../Assets/images/user-placeholder.png";

import "./editUser.scss";

const successToastTimer = 1000;

const errToastOptions = {
  position: "bottom-right",
  pauseOnHover: true,
  type: "error",
};

const successToastOptions = {
  position: "bottom-right",
  pauseOnHover: true,
  type: "success",
  autoClose: successToastTimer,
};

const EditUser = (props) => {
  const { users, isLoading, updateUser } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    if (!isLoading && users.length > 0 && id) {
      const userIndex = users.findIndex((user) => user.id == id);
      setIndex(userIndex);
      setData(users[userIndex]);
    }
  }, [users, isLoading, id]);

  const handleUserImgUpdate = (img) => {
    if (img) {
      setData({
        ...data,
        img: img,
      });
    }
  };

  const validate = () => {
    const newErrors = [];

    if (!data.name.trim()) {
      newErrors.push("Name is required");
    } else if (data.name.length < 3) {
      newErrors.push("Name must be at least 3 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.push("Email is required");
    } else if (!emailRegex.test(data.email)) {
      newErrors.push("Invalid email format");
    }

    if (
      !data.address.suite.trim() &&
      !data.address.street.trim() &&
      !data.address.city.trim()
    ) {
      newErrors.push("Address is required");
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((error) => toast(error, errToastOptions));
    } else {
      updateUser([...users.slice(0, index), data, ...users.slice(index + 1)]);
      toast("User info updated", successToastOptions);
      setTimeout(() => navigate("/"), successToastTimer + 500);
    }
  };

  return (
    <div className="container is-justify-content-center is-flex">
      <div className="edit-user-form is-flex is-flex-direction-column is-justify-content-center p-4">
        {data && (
          <div className="content-card p-5">
            <div className="columns is-gapless">
              <div className="column is-3">
                <div className="m-2">
                  <ImageUpload
                    selectedImage={data.img ? data.img : userPlaceholderImg}
                    setSelectedImage={handleUserImgUpdate}
                  />
                </div>
              </div>
              <div className="column">
                <div className="m-2">
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
                        <label
                          htmlFor="addr"
                          className="is-flex label is-5 mb-0"
                        >
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
                </div>
                <div className="is-flex is-justify-content-flex-end mt-5 m-2">
                  <button
                    type="submit"
                    className="button is-primary mt-5"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
