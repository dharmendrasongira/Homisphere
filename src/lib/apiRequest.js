import axios from "axios";

const apirequest = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export default apirequest;
