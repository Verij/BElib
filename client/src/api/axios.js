import axios from 'axios';



const instance = axios.create({
  baseURL:'https://b-elib-toea.vercel.app/https://belib.onrender.com/api',
  withCredentials: true
});

export default instance;
