import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_SERVICE_URL}`,
});

// Add a request interceptor to attach the Bearer token from local storage
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the token from local storage
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Bearer token to the request headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
