import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });


  const { name, username, email } = user;
  const [errors, setErrors] = useState({});


  const validate = () => {
    let inputErrors = {};
    if (!name) {
      inputErrors.name = "Name is required";
    } else if (name.length < 3) {
      inputErrors.name = "Name must be at least 3 characters long";
    }

    if (!username) {
      inputErrors.username = "Username is required";
    } else if (username.length < 3) {
      inputErrors.username = "Username must be at least 3 characters long";
    }

    if (!email) {
      inputErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      inputErrors.email = "Email address is invalid";
    }

    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const api_url = "https://full-stack-user-management-project.onrender.com"
  const onSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      await axios.post(api_url, user);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required
                minLength={3}
              />
              {errors.name && (
                <div className="text-danger">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                required
                minLength={3}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}

            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
