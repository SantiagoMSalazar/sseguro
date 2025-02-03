import express from 'express'
import { getProfile } from '../controllers/UserController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const router = express.Router()

// Perfil de usuario
router.get('/profile', authenticateToken, getProfile)

export default router
