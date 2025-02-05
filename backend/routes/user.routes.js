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
      ocupacion: user.ocupacion,
      genero: user.genero,
      fecha_nacimiento: user.fecha_nacimiento,
      rol: user.rol
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/permissions', authenticateToken, async (req, res) => {
  try {
    const { permissions } = req.body // Recibe un array de objetos
    const allowedFields = ['nombre', 'email', 'cedula', 'telefono', 'direccion', 'genero', 'ocupacion', 'fecha_nacimiento']

    if (!Array.isArray(permissions)) {
      throw new Error('El formato de permisos debe ser un array')
    }

    // Iterar sobre los permisos recibidos y actualizarlos
    // eslint-disable-next-line camelcase
    for (const { field_name, is_visible, expiration_date } of permissions) {
      if (!allowedFields.includes(field_name)) {
        // eslint-disable-next-line camelcase
        throw new Error(`Campo no permitido: ${field_name}`)
      }
      await UserRepository.updatePermisions(req.user.id, field_name, is_visible, expiration_date)
    }

    res.status(200).json({ message: 'Permisos actualizados correctamente' })
  } catch (error) {
    res.status(400).json({ error: 'Error a actualizar:' + error.message })
  }
})

router.delete('/delAcount', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    await UserRepository.deleteAccount(userId)
    // Limpiamos la cookie de autenticación
    res.clearCookie('access_token')

    res.status(200).json({
      message: 'Cuenta eliminada exitosamente'
    })
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

router.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id // ID del usuario autenticado
  const {
    nombre,
    email,
    password,
    cedula,
    telefono,
    direccion,
    // eslint-disable-next-line camelcase
    fecha_nacimiento,
    genero,
    ocupacion
  } = req.body

  try {
    // Validar que el usuario exista
    const user = await UserRepository.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    // Actualizar los datos
    const updatedUser = await UserRepository.updateProfile(userId, {
      nombre,
      email,
      password,
      cedula,
      telefono,
      direccion,
      // eslint-disable-next-line camelcase
      fecha_nacimiento,
      genero,
      ocupacion
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
