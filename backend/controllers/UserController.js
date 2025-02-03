import UserRepository from '../repositories/userRepository.js'

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await UserRepository.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')
    res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      cedula: user.cedula,
      telefono: user.telefono,
      direccion: user.direccion,
      fecha_nacimiento: user.fecha_nacimiento
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
