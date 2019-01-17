import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Error from "./components/Error";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      console.log("login clicked");
      console.log(this);
      axios
        .post("/createnewaccount", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          console.log(response);
          this.setState({ loggedIn: true, email: response.data.email });
          this.setState({ loggedIn: true });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleLogout = e => {
    e.preventDefault();
    this.setState({ loggedIn: false });
  };

  render() {
    if (this.state.loggedIn === true) {
      return (
        <div>
          <h1> I logged in! </h1>
          <button onClick={this.handleLogout}>Log out</button>
        </div>
      );
    }
    const { formErrors } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <div className="wrapper">
              <div className="form-wrapper">
                <h1>Log In/Create Account</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className={
                        formErrors.firstName.length > 0 ? "error" : null
                      }
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.firstName.length > 0 && (
                      <span className="errorMessage">
                        {formErrors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className={
                        formErrors.lastName.length > 0 ? "error" : null
                      }
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.lastName.length > 0 && (
                      <span className="errorMessage">
                        {formErrors.lastName}
                      </span>
                    )}
                  </div>
                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      className={formErrors.email.length > 0 ? "error" : null}
                      placeholder="Email"
                      type="email"
                      name="email"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                      <span className="errorMessage">{formErrors.email}</span>
                    )}
                  </div>
                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                      className={
                        formErrors.password.length > 0 ? "error" : null
                      }
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.handleChange}
                    />
                    {formErrors.password.length > 0 && (
                      <span className="errorMessage">
                        {formErrors.password}
                      </span>
                    )}
                  </div>
                  <div className="createAccount">
                    <button type="submit">Log In/Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          </Route>
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
