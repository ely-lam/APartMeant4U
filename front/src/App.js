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
import UserPage from "./pages/UserPage.js";

function App() {
  const [user, setUser] = useState("");
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
    console.log("getting user", storedUser);
  }, []);

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

  useEffect(() => {
    const getFavorites = async () => {
      console.log("getting favorites");
      try {
        const _favorites = await fetch("/favorites").then((res) => res.json());
        setFavorites(_favorites);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getFavorites();
  }, []);

  return (
    <Router>
      <div className="App container">
        <Link className="skip-link" href="#maincontent">Skip to main</Link>
        <main className="row" padding-left="15px" id="maincontent">
          <div className="col-sm">
            <Switch>
              <Route exact path="/"
                component={HomePage}
              />
              <Route path="/login" 
                component={LoginPage}
              />
              <Route path="/signup"
                component={SignUpPage}
              />
              <Route path="/listings"
                render={(props) => (
                  <AptListingsPage
                    {...props}
                    user={user}
                    listings={listings}
                  />
                )}
              />
              <Route path="/userPage"
                render={(props) => (
                  <UserPage
                    {...props}
                    user={user}
                    listings={listings}
                    favorites={favorites}
                  />
                )}
              />
            </Switch>
          </div>
        </main>

        <br/>
        <br/>
        <footer className="footer">
          <div>APartMeant4U - Ely Lam 2020 ©</div>
          <div>Icons made by <a className="copyright-link" href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a className="copyright-link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Favicon made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
