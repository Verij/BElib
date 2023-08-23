import Libro from '../models/libro-model.js'

//trae todos los libros de todas las tareas
// export const getLibros = async (req, res) => {
//   const libros = await Libro.find()
//   res.json(libros)
// };

export const getLibros = async (req, res) => {
  //el populate hace que no solo te tire la ID del usuario, sino que te tire todos los datos respecto a ese usuario dandome su informacion
  try {
      const libros = await Libro.find({user: req.user.id}).populate('user');
  res.json(libros)
  } catch (error) {
    return res.status(500).json({ message:"error"})
  }

  };

export const createLibro = async (req, res) => {
  try {
      const {titulo, genero, lanzamiento} = req.body;

  console.log(req.user);

  const newLibro = new Libro({
    titulo, genero, lanzamiento, user: req.user.id
  })
  await newLibro.save();
  const savedLibro = await newLibro.save();
  res.json(savedLibro);
  } catch (error) {
    return res.status(500).json({ message:"error al crear"})
  }

};

export const getLibro = async (req, res) => {
  try {
      const libro = await Libro.findById(req.params.id).populate('user');
  if (!libro) return res.status(404).json({message: "libro no encontrado en catalogo"})
  res.json(libro);
  } catch (error) {
    return res.status(404).json({ message:"no se encuentra el libro"})
  }

};

export const deleteLibro = async (req, res) => {
  try {
      const libro = await Libro.findByIdAndDelete(req.params.id)
  if(!libro) return res.status(404).json({message: "libro no encontrado en catalogo"})
  //podria hacer que me retorne el libro deleteado con res.json(libro);
  return res.sendStatus(204);
  } catch (error) {
        return res.status(404).json({ message:"no se encuentra el libro"})
  }

};

//me devuelve el dato nuevo que acabo de actualizar
export const updateLibro = async (req, res) => {
  try {
      const libro = await Libro.findByIdAndUpdate(req.params.id, req.body,{
    new: true
  })
  if(!libro) return res.status(404).json({message: "libro no encontrado en catalogo"})
  res.json(libro);
  } catch (error) {
    return res.status(404).json({ message:"no se encuentra el libro"})
  }

};