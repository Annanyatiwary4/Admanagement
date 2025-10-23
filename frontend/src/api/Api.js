import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // PHP backend
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminSignup = (data) => API.post("/signup.php", data);
export const adminLogin = (data) => API.post("/login.php", data);

export const getAds = () => API.get("/getAds.php");
export const addAd = (data) => API.post("/addAd.php", data);
export const editAd = (data) => API.post("/editAd.php", data);
export const deleteAd = (id) => API.post("/deleteAd.php", { id });
export const toggleAdStatus = (id, status) =>
  API.post("/toggleAd.php", { id, status });
