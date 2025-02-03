import { Router } from 'express'
import { UserRepository } from '../repositories/userRepository.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = Router()

router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await UserRepository.getPublicUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
