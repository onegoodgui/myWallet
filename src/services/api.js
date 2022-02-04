import axios from "axios";

const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function login(body) {
  const promise = axios.post(`${BASE_URL}/auth/login`, body);

  return promise;
}

function signUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);

  return promise;
}

function userData(token) {
  const promise = axios.get(`${BASE_URL}/mainpage/:${token}`);
  
  return promise;
}

const api =  {
    createConfig,
    login,
    signUp
}

export default api;