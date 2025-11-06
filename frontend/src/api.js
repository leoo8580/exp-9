import axios from "axios";

const API = axios.create({
  baseURL: "https://online-grocery-wi5z.onrender.com/api"
});

export default API;
