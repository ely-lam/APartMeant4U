import React from "react";

import { Link } from "react-router-dom";

export default function Navigation({ user }) {
  function onLogout() {
    fetch("/logout").then((res) => (window.location.href = "/"));
  }
  return (
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to ="/">APartMeant4U</Link>
      <ul className="navbar-nav ml-auto">
        <li>
          {user ? (
            <div className="nav-item">
              <div>Welcome {user} <Link onClick={onLogout}>Logout</Link></div>{" "}
            </div>
          ) : (
            <div>
              <Link className="nav-item" to="/login">Sign In</Link>
              <Link className="nav-item" to="/signup">Sign Up</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}