import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";
import { Login } from "../models/Login";
import { api } from '../../../services/api';



export const LoginService = {
  Post: async (login: Login) => {
    const API_URL = `${baseUrlApi}v1/auth`;
    const httpHeaders = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse = await axios.post(API_URL, login, {
      headers: httpHeaders,
    });

    if (response) {
      localStorage.setItem('token', response.data)
      api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      return response.data;
    }
  },
}