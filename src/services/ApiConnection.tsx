import axios from 'axios';
import { getTokenFromLocalStorage } from './utils';

export const ApiConnection = axios.create({
  baseURL: `http:localhost:3000`,
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
});

ApiConnection.interceptors.response.use((response) => {
  if (response.status === 401 || response.status === 400) {
    throw response;
  }
  return response;
}, (error) => {
  const errors = error.response.data;
  throw errors;
});

const getToken = () => {
  const token = getTokenFromLocalStorage();

  return token;
};

ApiConnection.interceptors.request.use((config) => {
  const token = getToken();
  if (config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});
