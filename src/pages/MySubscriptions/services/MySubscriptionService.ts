import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const MySubscriptionService = {
    Get: async (userId:number) => {
        try {
          const API_URL = `${baseUrlApi}v1/Courses/search`;
          const httpHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          };
          const response: AxiosResponse = await axios.get(API_URL, {
            headers: httpHeaders,
            params:{
              userId:userId
            }
          });
    
          if (response) {
            return response.data;
          }
        } catch (error) {
          throw new Error("Email ou senha incorretos");
        }
      },
}