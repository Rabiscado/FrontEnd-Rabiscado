import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";
import { SignUp } from "../models/SignUp";

export const SignUpService = {
  Post: async (signUp: SignUp) => {
    const API_URL = `${baseUrlApi}v1/Users`;
    const httpHeaders = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse = await axios.post(API_URL, signUp, {
      headers: httpHeaders,
    });

    if (response) {
      return response.data;
    }

  },
}