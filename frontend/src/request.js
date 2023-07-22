import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const paymentRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer  " + process.env.REACT_APP_API_SECRET,
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
