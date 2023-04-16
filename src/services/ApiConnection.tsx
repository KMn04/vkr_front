import axios from 'axios';

export const ApiConnection = axios.create({
  baseURL: `localhost:3000`,
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
  const token = localStorage.getItem('WorkNoteToken');

  return token;
};

ApiConnection.interceptors.request.use((config) => {
  const token = getToken();
  if (config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
