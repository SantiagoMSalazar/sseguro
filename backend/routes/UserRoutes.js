import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/register', UserController.register)
router.get('/users', UserController.getUsers)
router.post('/update-permission', UserController.updatePermission)

export default router
