import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './repositories/userRepository.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()

// Configuración de CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

// Middleware
app.use(express.json())
app.use(cookieParser())

// Middleware para validar token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' })
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)
    req.user = decoded // Asigna el usuario decodificado
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Acceso expirado' })
  }
}

// Endpoints

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserRepository.login({ email, password })
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 // 1 hora
      })
      .status(200)
      .json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Registro
app.post('/register', async (req, res) => {
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
    res.status(400).json({ error: error.message })
  }
})

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('access_token').send('Logged out')
})

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Bienvenido ${req.user.nombre}`)
})
// crud user
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id // Ahora debería funcionar correctamente
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
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
