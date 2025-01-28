// repositories/UserRepository.js
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export class UserRepository {
  static async create ({ username, password }) {
    // Validaciones
    Validations.username(username)
    Validations.password(password)

    let user = await User.findOne({ where: { username } })
    if (user) throw new Error('Usuario existente en e sistema')
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    // Crear usuario en PostgreSQL
    user = await User.create({
      username,
      password: hashedPassword
    })
    return user.id
  }

  static async login ({ username, password }) {
    // Validaciones
    Validations.username(username)
    Validations.password(password)
    // Buscar usuario
    const user = await User.findOne({ where: { username } })
    if (!user) throw new Error('Usuario no encontrado')

    // Validar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Contraseña incorrecta')

    return {
      id: user.id,
      username: user.username
    }
  }
}

class Validations {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 8) throw new Error('Password must be at least 8 characters long')
  }
}
