import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dolarapi.com/v1', // Base URL de la API
  timeout: 10000, // Tiempo de espera máximo
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
