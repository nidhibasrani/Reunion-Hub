import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

var axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 1000994877;

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  if (!token) {
    delete axiosInstance.defaults.headers.common["Authorization"];
    return;
  }
  config.headers["Authorization"] = "Bearer " + token;

  return config;
});

export default axiosInstance;
