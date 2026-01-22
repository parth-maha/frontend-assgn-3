import axios from "axios"

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});


api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${"t1o2k3e4n5"}`
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err) {
      console.log(err.message)
    }
    return Promise.reject(err);
  }
);

export default api;
