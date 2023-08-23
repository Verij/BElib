import axios from 'axios';



const instance = axios.create({
  baseURL:'https://belib.onrender.com/',
  withCredentials: true
});

export default instance;
