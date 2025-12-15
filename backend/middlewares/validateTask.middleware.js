const validateTask = (req, res, next) => {
  const { title, description, status } = req.body

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    })
  }

  const validStatus = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status value'
    })
  }

  next()
}

module.exports = validateTask
