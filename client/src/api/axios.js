import axios from 'axios';



const instance = axios.create({
  baseURL:'https://belib.onrender.com/api',
  withCredentials: true
});

export default instance;
