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
      <div key={idx} className="apt-li">
        <img
          className="apt"
          src={a.images[0]}
          alt={a.mapaddress}
          title={a.mapaddress}
          width="200"
        />{" "}
        <img
          className="apt"
          src={a.images[1]}
          alt={a.mapaddress}
          title={a.mapaddress}
          width="200"
        />{" "}
        <div className="header">
          <h4 className="title">{a.mapaddress}</h4>
        </div>
        <div className="body">
          <p className="text">Description: {a.titletextonly}</p>
          <p className="text">Price: {a.price}</p>
          <p className="text">Housing: {a.housing}</p>
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
        <div className="footer text-muted">
          <a className="link" href="#">
            <img
              className="tag"
              src={parkingImg}
              alt="Parking available"
              title="Parking available"
            />
          </a>
          <a className="link" href="#">
            <img
              className="tag"
              src={laundryImg}
              alt="Washer/Dryer unit"
              title="Washer/Dryer unit"
            />
          </a>
        </div>
      </div>
    ));
}