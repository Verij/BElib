import axios from "./axios";

export const getLibrosRequest = () => axios.get('/libros');

export const getLibroRequest = (id) => axios.get(`/libros/${id}`);

export const createLibroRequest = (libro) => axios.post("/libros", libro);

export const updateLibroRequest = (id, libro) => axios.put(`/libros/${id}`, libro);

export const deleteLibrosRequest = (id) => axios.delete(`/libros/${id}`);
