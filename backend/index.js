import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './repositories/userRepository.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
// cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
// middleware
app.use(express.json())
app.use(cookieParser())

// middleware para validar token
const auntenticateToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' })
  jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Acceso expirado' })
    req.user = user
    next()
  })
}

// crear endpoints

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
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
        maxAge: 1000 * 60 * 60
      })
      .status(200)
      .send({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.create({ username, password })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
app.get('/logout', (req, res) => {
  res.clearCookie('access_token').send('Logged out')
})
app.get('/protected', auntenticateToken, (req, res) => {
  res.send(`Bienvenido ${req.user.username}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
