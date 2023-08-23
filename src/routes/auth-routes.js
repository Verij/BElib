import {Router} from 'express';
import {login, register, logout, profile, verifyToken} from "../controllers/auth-controller.js";
import { authRequired } from '../middlewares/validateToken.js';
//importo los validadores del zod para el login y register
import {validateSchema} from '../middlewares/validatorMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/auth-schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/auth/verify-token", verifyToken);


export default router;