import React from "react";

import parkingImg from "../images/parking.png";
import laundryImg from "../images/laundry.png";
// import { Link } from "react-router-dom";

export default function aptListings(props) {
  return props.listings
    .filter((a) => a.mapaddress)
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