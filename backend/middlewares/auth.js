import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Acceso expirado' })
  }
}
