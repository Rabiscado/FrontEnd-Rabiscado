import { ForgotPassword } from "@pages/Login/models/ForgotPasswordModel";
import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const RecoverPassword = {
  GenerateToken: async (email: string) => {
    try {
      const API_URL = `${baseUrlApi}v1/auth/recover-password`;
      const httpHeaders = {
        "Content-Type": "multipart/form-data'",
      };
      const response: AxiosResponse = await axios.post(`${API_URL}?email=${email}`, {
        headers: httpHeaders,
        params: {
          email
        }
      });

      if (response) {
        return response.status;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },
  ChangePassword: async (data: ForgotPassword) => {
    try {
      const API_URL = `${baseUrlApi}v1/auth/reset-password`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response: AxiosResponse = await axios.post(`${API_URL}`, data, {
        headers: httpHeaders,
      });

      if (response) {
        return response.status;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },
}