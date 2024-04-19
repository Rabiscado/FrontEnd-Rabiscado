import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";
import { UserVideoWatched } from "../models/UserVideoWatched";

export const UserVideoWatchedService = {
    Post: async (userVideoWatched: UserVideoWatched) => {
        try {
          const API_URL = `${baseUrlApi}UserVideoWatched`;
          const httpHeaders = {
            "Content-Type": "application/json",
          };
          const response: AxiosResponse = await axios.post(API_URL, userVideoWatched,{
            headers: httpHeaders,
          });
    
          if (response) {
            return response.data;
          }
        } catch (error) {
          throw new Error("Email ou senha incorretos");
        }
      },
}