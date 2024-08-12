import axios from 'axios';

const twitterAxiosInstance = axios.create({
  baseURL: 'https://api.twitter.com/2',
  headers: {
    'Authorization': `Bearer YOUR_TWITTER_BEARER_TOKEN`,
  },
});

export default twitterAxiosInstance;
