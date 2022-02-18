import axios from "axios";

const BASE_URL = 'https://mywalletgdv.herokuapp.com';

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

function sendRegistry(body, auth) {
  const token = createConfig(auth);
  const promise = axios.post(`${BASE_URL}/mainpage/new_earning`,body, token);
  
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
    sendRegistry,
    getAllTransactions: getAllTransactions,
}

export default api;