import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5020/api', // HTTP kullan
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;