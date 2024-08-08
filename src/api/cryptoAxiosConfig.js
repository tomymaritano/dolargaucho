import axios from 'axios';

const cryptoAxiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export default cryptoAxiosInstance;
