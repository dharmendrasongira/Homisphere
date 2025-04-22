import axios from "axios";

const apirequest = axios.create({
  baseURL: "https://homisphere-api.onrender.com/api",
  withCredentials: true,
});
export default apirequest;
