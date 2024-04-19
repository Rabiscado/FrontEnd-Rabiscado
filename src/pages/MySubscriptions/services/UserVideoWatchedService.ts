import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const UserVideoWatchedService = {
    Get: async (userId: number, courseId: number) => {
        try {
          const API_URL = `${baseUrlApi}UserVideoWatched/percentage_completed/${userId}/${courseId}`;
          const httpHeaders = {
            "Content-Type": "application/json",
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
}