import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css

import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import AptListingsPage from "./pages/AptListingsPage.js";

import homePageIcon from "./images/home-128.png"; // nav brand icon


function App() {
  const [user, setUser] = useState("");
  const [listings, setListings] = useState("");

  function getUser() {
    fetch("/getUser")
      .then((res) => res.json())
      .then((_user) => {
        if (_user.username) setUser(_user.username);
      });
  }
  useEffect(getUser, []);

  useEffect(() => {
    const getListings = async () => {
      console.log("getting listings");
      try {
        const _listings = await fetch("/getListings").then((res) => res.json());
        setListings(_listings);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getListings();
  }, []);

  function onLogout() {
    fetch("/logout").then((res) => (window.location.href = "/"));
  }

  return (
    <Router>
      <div className="App container">
        <header>
          <Link className="skip-link" href="#maincontent">Skip to main</Link>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/"><img src={homePageIcon} alt="Home Page" width="32"/>{" "}APartMeant4U</a>
            <ul className="navbar-nav ml-auto">
              {user ? (
                <li>
                  <Link className="nav-item" to="/getListings">Search</Link>
                  <Link className="nav-item">User: {user}</Link>{" "}
                  <Link className="nav-item" onClick={onLogout}>Logout</Link>
                </li>
              ) : (
                <li>
                  <Link className="nav-item" to="/login">Sign In</Link>
                  <Link className="nav-item" to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <main className="row" padding-left="15px" id="maincontent">
          <div className="col-sm">
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/getListings">
                <AptListingsPage listings={listings}/>
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </main>

        <br/>
        <br/>
        <footer className="footer">
          <h5>APartMeant4U - Ely Lam 2020 ©</h5>
          <div>Icons made by <a className="copyright-link" href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a className="copyright-link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
