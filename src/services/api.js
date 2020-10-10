import axios from 'axios';

const api = axios.create({
  baseURL: 'http://157.230.213.199:3000/api',
})

export default api;