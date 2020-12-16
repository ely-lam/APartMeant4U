import axios from "axios";

export default axios.create({
  baseURL: "https://apartmeant4u.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});