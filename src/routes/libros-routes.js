import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {getLibros, createLibro, getLibro, updateLibro, deleteLibro} from '../controllers/libros-controller.js'


const router = Router ()

router.get('/libros', authRequired, getLibros)
router.get('/libros/:id', authRequired, getLibro)
router.post('/libros', authRequired, createLibro)
router.delete('/libros/:id', authRequired, deleteLibro)
router.put('/libros/:id', authRequired, updateLibro)

export default router;