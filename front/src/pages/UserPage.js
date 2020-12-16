import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import homePageIcon from "../images/home-512.png";
import parkingImg from "../images/parking.png";
import laundryImg from "../images/laundry.png";

export default function UserPage(props) {
  const [page, setPage] = useState(1);

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username !== null && username !== undefined) {
    localStorage.setItem("username", username);
  }
  
  function onLogout() {
    fetch("/logout").then((res) => (window.location.href = "/login"));
  }

  const renderFavorites = () => {
    const user = props.favorites.filter((u) => u.user.startsWith(username));
    const favorites = user[0].favs;

    console.log("user: ", user);
    console.log("favs: ", favorites);
    if (user.length === 0) return null;
    if (favorites.length === 0) return null;

    return props.listings
      .filter((a, i) => a._id.startsWith(favorites[i]))
      .map((a, idx) => (
        <li key={idx} className="apt-li card">
          <img
            className="apt card-img-top"
            src={a.images[0]}
            alt={a.mapaddress}
            title={a.mapaddress}
          />{" "}
          <div className="card-header">
            <h4 className="card-title">{a.mapaddress}</h4>
          </div>
          <div className="card-body">
            <p className="card-text">{a.titletextonly}</p>
            <a href="#" className="btn btn-primary">View Listing</a>
          </div>
          <div className="card-footer text-muted">
            <a className="card-link" href="#">
              <img
              className="tag"
              src={parkingImg}
              alt="Parking available"
              title="Parking available"
              />
            </a>
            <a className="card-link" href="#">
              <img
              className="tag"
              src={laundryImg}
              alt="Washer/Dryer unit"
              title="Washer/Dryer unit"
              />
            </a>
          </div>
        </li>
      ))
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log("rendering favorites");  
  return (
    <div>
      <nav className="navigation navbar navbar-light">
        <a href="/"><img src={homePageIcon} alt="Home Page" width="24" vertical-align="center"/></a>
        <span className="blank-text" href="/">a</span>
        <a className="navbar-brand" href="/">{" "}APartMeant4U</a>
        <ul className="navbar-nav ml-auto">
          <div>
            <Link className="nav-item" to={`${"/listings?username=" + username}`}>Search</Link>
            <Link className="nav-item active" to={`${"/userPage?username=" + username}`}>User: {username}</Link>
            <Link className="nav-item" onClick={onLogout}>Logout</Link>
          </div>
        </ul>
      </nav>
      <div className="favorites">
        <h4>Favorites</h4>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount="10"
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />

        <ul className="apt-ul card-columns">{renderFavorites()}</ul>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount="10"
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}