import axios from "axios";

//  PRODUCTION | DEVELOPMENT
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

export default instance;
