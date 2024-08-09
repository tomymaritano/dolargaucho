import axios from 'axios';

const argentinaApiAxiosConfig = axios.create({
  baseURL: 'https://api.argentinadatos.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default argentinaApiAxiosConfig;
