import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/aptListingsPage.css";

import parkingImg from "../images/parking.png";
import laundryImg from "../images/laundry.png";

function AptListingsPage(props) {
  const [search, setSearch] = useState("");

  const renderListings = () => {
    return props.listings
      .filter((a) => a.mapaddress && a.mapaddress.toLowerCase().startsWith(search.toLowerCase()))
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
            <a href="#" class="btn btn-primary">View Listing</a>
          </div>
          <div class="card-footer text-muted">
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
      ));
  }

  console.log("rendering listings", search);

  
  return (
    <div className="aptlistings">
      <br/>
      <label htmlFor="search">
        Search for an apartment by name: {" "}
        <input
          type="text"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
      </label>
      <br />
      <br />
      <ul className="apt-ul card-columns">{renderListings()}</ul>
    </div>
  );
}

AptListingsPage.propTypes = {
  listings: PropTypes.array,
};

export default AptListingsPage;