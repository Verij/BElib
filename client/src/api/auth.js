import axios from './axios';



// const API = 'http://localhost:3000/api'

//hace el request para el register
export const registerReq = user => axios.post(`/register`, user);

//hace el request para el login

export const loginReq = user => axios.post(`/login`, user);

export const verifyTokenReq = () => axios.get('/auth/verify-token');

