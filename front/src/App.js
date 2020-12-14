import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css

import Navigation from "./components/Navigation.js";

import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import AptListingsPage from "./pages/AptListingsPage.js";


function App() {
  const [user, setUser] = useState("");

  function getUser() {
    fetch("/getUser")
      .then((res) => res.json())
      .then((_user) => {
        if (_user.username) setUser(_user.username);
      });
  }

  useEffect(getUser, []);

  return (
    <Router>
      <div className="App container">
        <Navigation user={user}></Navigation>

        <div className="row" padding-left="15px">
          <div className="col-sm">
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/listings">
                <AptListingsPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </div>

        <br/>
        <footer>
          <p>Favicon made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
