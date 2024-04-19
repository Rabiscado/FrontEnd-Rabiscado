import baseUrlApi from '@utils/baseUrlApi';
import axios from 'axios';

const api = axios.create({
  baseURL: baseUrlApi,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { api };

// api.interceptors.request.use(async (config) => {
//   const token = getCurrentAccount();
//   if (!token) {

//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     // window.location.href = '/';
//   }
//   return config;
// });

// when the response is 401, the user is not authenticated