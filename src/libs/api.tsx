// const axios = require('axios');

import axios from "axios";

// // Create a custom Axios instance
// const api = axios.create({
//   baseURL: 'https://api.example.com', // Default base URL
//   timeout: 5000,                      // Request timeout in ms
//   headers: { 'Content-Type': 'application/json' } // Default headers
// });

export const api = axios.create(
{
  baseURL: 'http://localhost:5000/api', // Default base URL
  timeout: 5000,                      // Request timeout in ms
  headers: { 'Content-Type': 'application/json' } // Default headers
}
);