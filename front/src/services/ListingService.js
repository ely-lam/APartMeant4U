import axios from "axios";
import env from "../env.js";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
if (username !== null && username !== undefined) {
  localStorage.setItem("username", username);
}

const getAllListings = (params) => {
  return axios.get(env[process.env.NODE_ENV].api + "/getListings", { params });
};

const searchAllListings = (searchTerm) => {
  return axios.get(env[process.env.NODE_ENV].api + "/getListings/search?searchTerm=" + searchTerm);
};

const listing = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/getListings/one?id=" + id);
};

const addListing = (payload) => {
  payload.userId = username.id;
  return axios.post(env[process.env.NODE_ENV].api + "/getListings/add", payload);
};

module.exports = {
  getAllListings,
  searchAllListings,
  listing,
  addListing
};
