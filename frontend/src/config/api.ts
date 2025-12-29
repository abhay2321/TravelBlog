import axios from 'axios';

// console.log(import.meta.env.VITE_API_PATH);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_PATH || 'http://localhost:5000',
});

export default api;
