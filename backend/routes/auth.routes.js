import { Router } from 'express'
import { UserRepository } from '../repositories/userRepository.js'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserRepository.login({ email, password })
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .status(200)
      .json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/register', async (req, res) => {
  // eslint-disable-next-line camelcase
  const { nombre, email, password, cedula, telefono, direccion, fecha_nacimiento } = req.body
  try {
    const userId = await UserRepository.create({
      nombre,
      email,
      password,
      cedula,
      telefono,
      direccion,
      // eslint-disable-next-line camelcase
      fecha_nacimiento
    })
    res.status(201).json({ id: userId, message: 'Usuario registrado exitosamente' })
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: error.message })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('access_token').send('Logged out')
})

export default router
