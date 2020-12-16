import React from "react";

import parkingImg from "../images/parking.png";
import laundryImg from "../images/laundry.png";
// import { Link } from "react-router-dom";

export default function aptListings(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username !== null && username !== undefined) {
    localStorage.setItem("username", username);
  }

  return props.listings
    .filter((a) => a._id.startsWith(props.apt))
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