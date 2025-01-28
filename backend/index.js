import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './repositories/userRepository.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
// middleware
app.use(express.json())
// crear endpoints

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user.id, username: user.username },
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
app.get('/logout', (req, res) => {})
app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
