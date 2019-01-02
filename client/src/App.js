import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: false
  }

  handleLogin = (event) => {
    event.preventDefault();
    console.log("login clicked");
    console.log(this);
    axios.post("/login", {
      username: "admin",
      password: "test"
    })
    .then((response) => {
      console.log(response);
      this.setState({loggedIn: true, username: response.data.username});
    })
    .catch(function(error) {
      console.log(error);
    })
    // this.setState({ loggedIn: true });
  }

  componentDidMount() {
    console.log("componentDidMount lifecycle method ran")
    // axios.get("allusers")
    //   .then(response => { console.log(response) });

    // Check user data to see if user should be logged in

    axios.get("/user_data")
    .then(response => {console.log(response);
      if (response.data.loggedIn) {
        this.setState({loggedIn: true, username: response.data.username});
      } else {
        console.log("No logged in user stored in session")
      }
    });
  }

  render() {
    let banner = this.state.loggedIn ? `Woah! ${this.state.username} logged in!` : `UNAUTHORIZED USER`;
    return (
      <div className="App">
        <h1>{banner}</h1>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello user</h2>
        </div>
        <p className="App-intro">
          {!this.state.loggedIn ? 
            (<button onClick={this.handleLogin}>Log in to Application</button>) : ""}
        </p>
      </div>
    );
  }
}

export default App;
