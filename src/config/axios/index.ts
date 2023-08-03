import axios from "axios";

//  PRODUCTION | DEVELOPMENT
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export default instance;
