import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-wallet-theos.herokuapp.com',
});

export default api;
