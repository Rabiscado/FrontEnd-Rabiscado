import { api } from "../api";


const endpoint = "/v1/extracts";

const objectToQueryString = (obj: any) => {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export const ExtractService = {
  Search: async (data: any): Promise<any> => {
    const query = objectToQueryString(data);
    const response = await api.get(endpoint + '/search' + `?${query}`, data);
    return response.data;
  }
};

