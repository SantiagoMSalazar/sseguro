import UserRepository from '../repositories/userRepository.js'

export const registerUser = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { direccion, fecha_nacimiento, ...userData } = req.body
    // Se asume que UserRepository.create retorna el id del usuario creado
    // eslint-disable-next-line camelcase
    const userId = await UserRepository.create({ direccion, fecha_nacimiento, ...userData })
    res.status(201).json({ id: userId, message: 'Usuario registrado exitosamente' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token').send('Logged out')
}

export const protectedRoute = (req, res) => {
  res.send(`Bienvenido ${req.user.nombre}`)
}
