import {z} from 'zod'
//hago la validacion de datos con zod en el backend
export const registerSchema = z.object({
  username: z.string({
    required_error: 'Se requiere nombre de usuario'
  }).max(12,{
    message:'Nombre de usuario demasiado largo'
  }),
  email: z.string({
    required_error: 'Se requiere un email'
  }).email({
    message: 'email invalido'
  }).max(30,{
    message: 'Mail demasiado largo'
  }),
  password: z.string({
    required_error: 'se requiere contraseña'
  }).min(6,{
    message: 'la contraseña debe tener al menos 6 caracteres'
  })
})

export const loginSchema = z.object({
  email:z.string({
    required_error: "se requiere email",
  }).email({
    message: "Mail invalido",
  }),
  password: z.string({
    required_error: "se requiere contraseña"
  }).min(6, {
    message: "la contraseña debe tener al menos 6 caracteres"
  }),

});