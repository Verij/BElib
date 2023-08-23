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

app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "https://b-elib-toea.vercel.app/");
      res.header("Access-Control-Allow-Credentials: true");
      res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers: Content-Type, *");
      next();
});



app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", librosRoutes);

export default app;
