// src/api/axios.js
import axios from 'axios';

const API_URL = 'https://medico-mall-server.vercel.app'; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
