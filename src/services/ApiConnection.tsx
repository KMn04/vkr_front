import axios from 'axios';
import { getRefreshTokenFromLocalStorage, getTokenFromLocalStorage, setTokenToLocalStorage } from './utils';
import RefreshTokenService from './RefreshTokenServices';

export const tryRefreshAccess = async () => {
  const refreshToken = getRefreshTokenFromLocalStorage();
  if(refreshToken){
    const response = await RefreshTokenService.getAccess({refreshToken: refreshToken});
    setTokenToLocalStorage(response.token);
    location.reload()
  }
  return false
}

export const ApiConnection = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
});

ApiConnection.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error)
  if (error.response.status === 401) {
    tryRefreshAccess()
  }
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