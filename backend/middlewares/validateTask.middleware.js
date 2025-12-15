// Middleware para validar los datos de una tarea
// Se ejecuta antes de crear o actualizar una tarea
const validateTask = (req, res, next) => {

  // extraemos los datos del body
  const { title, description, status } = req.body

  // validamos que título y descripción existan
  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    })
  }

  // sstados válidos permitidos para una tarea
  const validStatus = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

  // si se envía un estado, validamos que sea correcto
  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status value'
    })
  }

  // si todo está correctocontinuamos con la ejecución
  next()
}

// exportamos el middleware
module.exports = validateTask
