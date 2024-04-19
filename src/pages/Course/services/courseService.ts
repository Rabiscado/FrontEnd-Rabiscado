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

export const CourseService = {
  GetAll: async () => {
    try {
      const API_URL = `${baseUrlApi}v1/courses`;
      const httpHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },
  Get: async (courseId: number) => {
    try {
      const API_URL = `${baseUrlApi}v1/courses/${courseId}`;
      const httpHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },
  Filter: async (filter: any) => {
    if (filter.ForWho === "Conduzido") filter.ForWho = "Led";
    if (filter.ForWho === "Condutor") filter.ForWho = "Conductor";
    if (filter.ForWho === "Casal") filter.ForWho = "Couple";
    try {
      const API_URL = `${baseUrlApi}v1/Courses/search`;
      const httpHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
        params: filter,
      });

      if (response) {
        return response.data.itens;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },


};
