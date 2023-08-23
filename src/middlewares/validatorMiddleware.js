export const validateSchema = (schema) => (req,res, next)=>{
  try {
    schema.parse(req.body);
    next()
  } catch (error) {
    //zod me manda una lista de errores pero yo quiero que me muestre uno en especifico, entonces recorro los errores para que me muestre el que quiero que es el del message
    return res.status(400).json(error.errors.map(error => error.message))
  }
}