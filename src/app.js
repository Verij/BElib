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




app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", librosRoutes);

export default app;
