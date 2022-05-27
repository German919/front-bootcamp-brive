import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:44331/api';   
   
export const axiosRequest = async (endpoint, data, method = "GET") => {
   if (method === "GET") {
     return await axios.get(endpoint);
   } else {
     return await axios.request(endpoint, {
        method,
        data
     });
   }
};