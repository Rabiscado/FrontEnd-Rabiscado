import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const VideoService = {
    Get: async (videoId: number) => {
        try {
          const API_URL = `${baseUrlApi}Videos/${videoId}`;
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