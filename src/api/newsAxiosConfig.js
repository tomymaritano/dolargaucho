import axios from 'axios';

const newsAxiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

export default newsAxiosInstance;
