import User from '../models/User.js'
import bcrypt from 'bcrypt'

export class UserRepository {
  // eslint-disable-next-line camelcase
  static async create ({ nombre, email, password, cedula, telefono, direccion, fecha_nacimiento }) {
    // Validaciones
    Validations.nombre(nombre)
    Validations.email(email)
    Validations.password(password)
    Validations.cedula(cedula)
    Validations.telefono(telefono)
    Validations.direccion(direccion)
    Validations.fecha_nacimiento(fecha_nacimiento)

    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { email } })
    if (user) throw new Error('El correo electrónico ya está registrado en el sistema')

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario en PostgreSQL
    user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      cedula,
      telefono,
      direccion,
      // eslint-disable-next-line camelcase
      fecha_nacimiento
    })

    return user.id
  }

  static async login ({ email, password }) {
    // Validaciones
    Validations.email(email)
    Validations.password(password)

    // Buscar usuario
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('Usuario no encontrado')

    // Validar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Contraseña incorrecta')

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    }
  }
}

class Validations {
  static nombre (nombre) {
    if (typeof nombre !== 'string') throw new Error('El nombre debe ser una cadena de texto')
    if (nombre.length < 3) throw new Error('El nombre debe tener al menos 3 caracteres')
  }

  static email (email) {
    if (typeof email !== 'string') throw new Error('El correo electrónico debe ser una cadena de texto')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('El correo electrónico no es válido')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('La contraseña debe ser una cadena de texto')
    if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
  }

  static cedula (cedula) {
    if (typeof cedula !== 'string') throw new Error('La cédula debe ser una cadena de texto')
    if (cedula.length !== 10) throw new Error('La cédula debe tener 10 caracteres')
  }

  static telefono (telefono) {
    if (typeof telefono !== 'string') throw new Error('El teléfono debe ser una cadena de texto')
    if (telefono.length !== 10) throw new Error('El teléfono debe tener 10 caracteres')
  }

  static direccion (direccion) {
    if (typeof direccion !== 'string') throw new Error('La dirección debe ser una cadena de texto')
    if (direccion.length < 5) throw new Error('La dirección debe tener al menos 5 caracteres')
  }

  // eslint-disable-next-line space-before-function-paren
  // eslint-disable-next-line camelcase
  static fecha_nacimiento (fecha_nacimiento) {
    const date = new Date(fecha_nacimiento)
    // eslint-disable-next-line camelcase
    if (!(date instanceof Date) || isNaN(date)) {
      // eslint-disable-next-line camelcase
      throw new Error('La fecha de nacimiento debe ser una fecha válida' + fecha_nacimiento)
    }
  }
}
