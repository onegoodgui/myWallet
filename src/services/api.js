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

function sendEarning(body, config) {
  const promise = axios.post(`${BASE_URL}/mainpage/new_earning`,body, config);
  
  return promise;
}

function getAllTransactions(config) {
  const promise = axios.get(`${BASE_URL}/mainpage/earnings`,config);
  
  return promise;
}


const api =  {
    createConfig,
    login,
    signUp,
    sendEarning,
    getAllTransactions: getAllTransactions,
}

export default api;