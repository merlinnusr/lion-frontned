import axios from "axios";

export default axios.create({
  baseURL: "http://lion-crud-backend.test/api",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
  }
});