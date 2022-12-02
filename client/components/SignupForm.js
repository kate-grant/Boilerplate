import React from "react";
import { connect } from "react-redux";
import { authenticateSignUp } from "../redux/auth";

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    const phoneNumber = evt.target.phoneNumber.value;
    props.authenticateSignUp(
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber
    );
  };

  return (
    <div>
      <div
        style={{
          width: "40%",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "5rem auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "none",
            justifyContent: "center",
          }}
        >
          <h3>Create Account</h3>
          <div>
            <form onSubmit={handleSubmit} className="trip-form">
              <div>
                <input
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  name="username"
                  placeholder="Username"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
              </div>
              <div>
                <input name="email" placeholder="Email" type="text" required />
              </div>
              <div>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Phone: 000-000-0000"
                  name="phoneNumber"
                />
              </div>
              <div>
                <button className="btn-primary" type="submit">
                  Register
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateSignUp: (
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber
    ) =>
      dispatch(
        authenticateSignUp(
          firstName,
          lastName,
          username,
          password,
          email,
          phoneNumber
        )
      ),
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
