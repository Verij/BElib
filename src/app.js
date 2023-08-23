import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
//cors para que no me tire el error de policy de CORS y para poder establecer las cookies
import cors from 'cors';

import authRoutes from './routes/auth-routes.js';
import librosRoutes from './routes/libros-routes.js';

const app = express();

app.use(cors({
  origin:'https://b-elib-toea.vercel.app/',
  credentials: true
}));

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", librosRoutes);

export default app;
