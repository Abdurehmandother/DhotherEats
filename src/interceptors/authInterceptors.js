import axios from "axios";
import { Promise } from "mongoose";

axios.interceptors.request.use(
  (req) => {
    const user = localStorage.getItem("user");
    const token = user && JSON.parse(user).token;

    if (token) {
      req.headers["access-token"] = token;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
