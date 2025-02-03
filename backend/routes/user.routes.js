import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.js'
import { UserRepository } from '../repositories/userRepository.js'

const router = Router()

router.get('/protected', authenticateToken, (req, res) => {
  res.send(`Bienvenido ${req.user.nombre}`)
})

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await UserRepository.findById(req.user.id)
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
})

router.put('/permisions', authenticateToken, async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { field_name, is_visible } = req.body
    const allowedFields = ['nombre', 'email', 'cedula', 'telefono', 'direccion', 'fecha_nacimiento']
    if (!allowedFields.includes(field_name)) throw new Error('Campo no permitido')
    await UserRepository.updatePermisions(req.user.id, field_name, is_visible)
    res.status(200).json({ message: 'Permisos actualizados' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
