import { model } from 'mongoose';
import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';



export const register = async (req, res) => {
  const {email, password, username} = req.body

try {

  //aca va a verificar si existe el user
  const userFound = await User.findOne({email})
  if(userFound) return res.status(400).json(
 ["ya existe el usuario con este mail"]
  );

  //aca va el hash del password y crea el usuario
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
    username,
    email,
    password: passwordHash,
  });

  const userSaved = await newUser.save();
  const token = await createAccessToken({id: userSaved._id})


    res.cookie('token', token,{
      sameSite: 'none',
      secure: true,
      httpOnly: false
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });

} catch (error) {
  res.status(500).json({message: error.message});
}


}

export const login = async (req, res) => {
  const {email, password} = req.body

try {

    //veo si encuentra el usuario
    const userFound = await User.findOne({email})
    if(!userFound) return res.status(400).json({ message: "No se encuentra el usuario"});

    //comparo las contraseñas con el usuario de la database
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if(!passwordMatch) return res.status(400).json( {message: "contraseña incorrecta"} );


    const token = await createAccessToken({id: userFound._id})


    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

} catch (error) {
  res.status(500).json({message: error.message});
}


}

//funcion para el logout
export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200);
}

//funcion del perfil validacion
export const profile = async (req, res) => {
  //busco en la DB la id del usuario
  const userFound = await User.findById(req.user.id)
  if(!userFound) return res.status(400).json({ message: "usuario no encontrado"});

  return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
  })
};


export const verifyToken = async (req, res) =>{
  const {token} = req.cookies;
  //si no existe el token en las cookies, que me devuelva un mensaje de no autorizado
  if (!token) return res.status(401).json({ message: "No autorizado"});

  jwt.verify(token, TOKEN_SECRET, async (err, user) =>{
    if (err) return res.status(401).json({ message: "No autorizado"});

    const userFound = await User.findById(user.id)
    //pero si el usuario no existe , que tambien me retorne un no autorizado
    if (!userFound) return res.status(401).json({ message: "No autorizado"});


    //si va todo bien entonces

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });

  });
};