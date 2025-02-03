import User from '../models/User.js'
import UserPermissionsRepository from '../repositories/UserPermissionsRepository.js'
import { Sequelize } from 'sequelize'
import db from '../config/dbAuth.js'

const UserController = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async getUsers (_, res) {
    try {
      const users = await db.query('SELECT * FROM public_users', {
        type: Sequelize.QueryTypes.SELECT
      })
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async updatePermission (req, res) {
    try {
      const { userId, fieldName, isVisible } = req.body
      await UserPermissionsRepository.updatePermission(userId, fieldName, isVisible)
      res.status(200).json({ message: 'Permiso actualizado' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default UserController
