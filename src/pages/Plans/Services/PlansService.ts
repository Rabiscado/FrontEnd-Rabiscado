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
export const PlansService = {
  GetAll: async () => {
    try {
      const API_URL = `${baseUrlApi}v1/Plans`;
      const httpHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
  GetById: async (id: number) => {
    try {
      const API_URL = `${baseUrlApi}v1/Plans/${id}`;
      const httpHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
  }
}