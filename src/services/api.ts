import axios from "axios"

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});


axios.interceptors.request.use(config => {
  console.log(`[${config.method}] - ${config.url}`)
  return config;
});

axios.interceptors.response.use(
  res => res,
  err => {
    if (err) {
      console.log(err.message)
    }
    return Promise.reject(err);
  }
);

export default api;
