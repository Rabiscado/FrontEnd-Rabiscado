import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";
axios.interceptors.response.use(
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
export const CourseSubscriptionsService = {
  Subscribe: async (courseId: number) => {
    const API_URL = `${baseUrlApi}v1/Users/course-subscribe`;
    const httpHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    const response: AxiosResponse = await axios.post(API_URL, {
      // userId: userId,
      courseId: courseId
    }, {
      headers: httpHeaders,
    });

    if (response) {
      return response.data;
    }
  },
}