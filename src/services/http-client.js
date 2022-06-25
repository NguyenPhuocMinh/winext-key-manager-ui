import axios from 'axios';

const AUTH_TOKEN = '';

axios.defaults.headers.common['X-Access-Token'] = AUTH_TOKEN;

const restAuthProvider = process.env.REACT_APP_REST_AUTH_PROVIDER;

const httpClientAuthProvider = axios.create({
  baseURL: restAuthProvider,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin'
  },
  withCredentials: false
});

export { httpClientAuthProvider };
