import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
// import { getAllListings, searchAllListings } from "../../api/thread";

import ListingService from "../services/ListingService.js";
import ListingDetails from "../components/aptListings.js";

import "../styles/aptListingsPage.css";

import homePageIcon from "../images/home-512.png";
import parkingImg from "../images/parking.png";
import laundryImg from "../images/laundry.png";

function AptListingsPage(props) {
  //get username
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username !== null && username !== undefined) {
    localStorage.setItem("username", username);
  }
  let searchDescriptionParam = urlParams.get("searchDesc");
  if (searchDescriptionParam !== null && searchDescriptionParam !== undefined) {
    localStorage.setItem("searchDesc", searchDescriptionParam);
  }
  let searchDescriptionGet = localStorage.getItem("searchDesc");
  if (searchDescriptionGet !== null || searchDescriptionGet !== undefined) {
    searchDescriptionGet = "";
  }

  const [search, setSearch] = useState("");
  const [searchDescription, setSearchDescription] = useState(searchDescriptionGet);
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentListing, setCurrentListing] = useState("");

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  function onLogout() {
    fetch("/logout").then((res) => (window.location.href = "/login"));
  }

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const onChangeSearchDescription = (e) => {
    const searchDescription = e.target.value;
    // (searchDescriptionGet !== null ? setSearchDescription(searchDescriptionGet) : setSearchDescription(searchDescription));
    setSearchDescription(searchDescription);
  };

  const getRequestParams = (search, page, limit) => {
    let params = {};

    if (search) {
      params["title"] = search;
    }

    if (page) {
      params["skip"] = page - 1;
    }

    if (limit) {
      params["limit"] = limit;
    }

    return params;
  };

  // const retrieveListings = () => {
  //   const params = getRequestParams(search, page, limit);

  //   ListingService.getAllListings(params)
  //     .then((response) => {
  //       const { listings, totalPages } = response.data;

  //       setListings(listings);
  //       setSkip(totalPages);

  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // useEffect(retrieveListings, [page, limit]);

  // const refreshList = () => {
  //   retrieveListings();
  //   setCurrentIndex(-1);
  // };

  // const setActiveListing = (tutorial, index) => {
  //   setCurrentIndex(index);
  // };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <nav className="navigation navbar navbar-light">
        <a href="/"><img src={homePageIcon} alt="Home Page" width="24" vertical-align="center"/></a>
        <span className="blank-text" href="/">a</span>
        <a className="navbar-brand" href="/">{" "}APartMeant4U</a>
        <ul className="navbar-nav ml-auto">
          <div>
            <Link className="nav-item active" to={`${"/listings?username=" + username}`}>Search</Link>
            <Link className="nav-item" to={`${"/userPage?username=" + username}`}>User: {username}</Link>
            <Link className="nav-item" onClick={onLogout}>Logout</Link>
          </div>
        </ul>
      </nav>
      <div className="aptlistings">
        <h4>Apartments List</h4>
        <br/>
        <div className="apt-list">
          <label htmlFor="search">
            <div className="input-group-append">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={search}
                onChange={onChangeSearch}
              />
            </div>
          </label>
          <br/>
          <label htmlFor="searchDescription" padding-left="20px">
            <div className="input-group-append">
              <input
                type="text"
                className="form-control"
                placeholder="Search by description"
                value={searchDescription}
                onChange={onChangeSearchDescription}
              />
            </div>
          </label>
          <Pagination
            className="my-3"
            count={skip}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {showListings ? <ul className="apt-ul card-columns">
            {props.listings
              .filter((a) => a.mapaddress && ((search !== "") ? a.mapaddress.toLowerCase().startsWith(search.toLowerCase()) : a.titletextonly.toLowerCase().includes(searchDescription.toLowerCase())))
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
                    <button
                      className="btn btn-primary"
                      onClick={(evt) => {
                        evt.preventDefault();
                        setShowListings(false);
                        setCurrentListing(`${a._id}`);
                      }}>
                      View Listing
                    </button>
                    <form className="text-center" action="/newFav" method="post">
                      <input
                        type="hidden"
                        name="addFav"
                        id={a._id}
                        value={a._id}
                      />
                      <input
                        type="hidden"
                        name="user"
                        id={`${a._id} user`}
                        value={username}
                      />
                      <button className="btn btn-primary" type="submit">Add to favorites</button>
                    </form>
                  </div>
                  <div className="card-footer text-muted">
                    <Link className="card-link" to="/listings?username=hi&searchDesc=parking">
                      <img
                        className="tag"
                        src={parkingImg}
                        alt="Parking available"
                        title="Parking available"
                      />
                    </Link>
                    <Link className="card-link" href="/listings?username=hi&searchDesc=w%2Fd">
                      <img
                        className="tag"
                        src={laundryImg}
                        alt="Washer/Dryer unit"
                        title="Washer/Dryer unit"
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ul> :
            <div>
              <button
                className="btn btn-primary"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShowListings(true);
                  setCurrentListing("");
                }}>
                Back
              </button>
              <ListingDetails apt={currentListing} listings={props.listings}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

AptListingsPage.propTypes = {
  listings: PropTypes.array,
};

// <ul className="apt-ul card-columns">{renderListings()}</ul>
export default AptListingsPage;