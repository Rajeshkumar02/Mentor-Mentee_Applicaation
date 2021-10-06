import React, {Component} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
// import Home from "./components/Home";
import StudentList from "./Components/StudentList";
import AddMentee from "./Components/AddMentees";
import LogIn from "./Components/login";
import SignUp from "./Components/signUp";
import Logdetials from "./Components/Logdetials";
import {AuthProvider} from "./Components/Auth";
import Dashboard from "./Components/Dashboard";
import Forgot from "./Components/Forgot";

class App extends Component {
  render() {
    return (<AuthProvider>
      <Router>
        <Route exact path="/">
          <Redirect to="/Login"/>
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard/>
        </Route>
        <Route exact path="/Login">
          <LogIn/>
        </Route>
        <Route exact path="/addmentee">
          <AddMentee/>
        </Route>
        <Route exact path="/log">
          <Logdetials/>
        </Route>
        <Route exact path="/forgot">
          <Forgot/>
        </Route>
        <Route exact path="/signUp">
          <SignUp/>
        </Route>
        <Route exact path="/list">
          <StudentList/>
        </Route>
      </Router>
    </AuthProvider>);
  }
}

export default App;