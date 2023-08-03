const axios = require("axios");

/**
 * Fetch IPFS data with GET Method
 */
export const fetchIPFSData = (endpoint: string): any => {
  return axios.get(`${endpoint}`);
};
