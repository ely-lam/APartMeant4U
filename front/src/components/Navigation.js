import React from "react";

import { Link } from "react-router-dom";
import homePageIcon from "../images/home-64.png"; // nav brand icon

export default function Navigation(props) {
  return (
    <nav className="navigation navbar navbar-light">
      <a href="/"><img src={homePageIcon} alt="Home Page" width="24" vertical-align="center"/></a>
      <span className="blank-text" href="/">a</span>
      <a className="navbar-brand" href="/">{" "}APartMeant4U</a>
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-item" to="/login">Sign In</Link>
          <Link className="nav-item" to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}